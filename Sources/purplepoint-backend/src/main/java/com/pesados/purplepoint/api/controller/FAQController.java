package com.pesados.purplepoint.api.controller;

import com.pesados.purplepoint.api.exception.NewQuestionBadRequest;
import com.pesados.purplepoint.api.exception.QuestionNotFoundException;
import com.pesados.purplepoint.api.exception.UnauthorizedDeviceException;
import com.pesados.purplepoint.api.model.question.Question;
import com.pesados.purplepoint.api.model.question.QuestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class FAQController {

	private final QuestionService faqService;
	private LoginSystem loginSystem;

	@Autowired
	public FAQController(LoginSystem loginSystem, QuestionService faqService) {
		this.loginSystem = loginSystem;
		this.faqService = faqService;
	}

	@Operation(summary = "Like a Question", description = "Indicate a user dislikes a question from the FAQ.", tags = {"question"})
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "successful operation",
					content = @Content(array = @ArraySchema(schema = @Schema(implementation = Question.class)))) })
	@PutMapping(value = "/wiki/faqs/like/{email}", produces = { "application/json", "application/xml"})
	Question updatedQuestion (
			@Parameter(required = false, hidden=true) @RequestHeader("Authorization") String unformatedJWT,
			@Parameter(description = "Email of the user who likes the question.", required = true)
			@Valid @PathVariable String email,
			@Parameter(description = "ID of the question the user likes.", required = true)
			@Valid @RequestBody Long questionId) {

		if (this.loginSystem.checkLoggedIn(unformatedJWT)) {
			if (faqService.getQuestionByID(questionId).isPresent()) {
				Optional<Question> updatedQuestion = faqService.getQuestionByID(questionId);
				List<String> likingUsers = updatedQuestion.get().getListNumUpvotes();
				// Has the user already liked the question?
				if (likingUsers.contains(email)) {
					// Remove from likes
					updatedQuestion.get().getListNumUpvotes().remove(email);
					updatedQuestion.get().setNumUpvotes(updatedQuestion.get().getNumUpvotes()-1);
					return faqService.saveQuestion(updatedQuestion.get());
				} else {
					List<String> dislikingUsers = updatedQuestion.get().getListNumUpvotes();
					// Has the user disliked the question before?
					if (dislikingUsers.contains(email)) {
						// Remove the dislike
						updatedQuestion.get().getListNumDownvotes().remove(email);
						updatedQuestion.get().setNumDownvotes(updatedQuestion.get().getNumDownvotes()-1);
					}
					updatedQuestion.get().getListNumUpvotes().add(email);
					updatedQuestion.get().setNumUpvotes(updatedQuestion.get().getNumUpvotes()+1);
					return faqService.saveQuestion(updatedQuestion.get());
				}
			} else {
				throw new QuestionNotFoundException(questionId);
			}
		} else {
			throw new UnauthorizedDeviceException();
		}
	}

	@Operation(summary = "Dislike a Question", description = "Indicate a user dislikes a question from the FAQ.", tags = {"question"})
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "successful operation",
					content = @Content(array = @ArraySchema(schema = @Schema(implementation = Question.class)))) })
	@PutMapping(value = "/wiki/faqs/dislike/{email}", produces = { "application/json", "application/xml"})
	Question updatedQuestion2 (
			@Parameter(required = false, hidden=true) @RequestHeader("Authorization") String unformatedJWT,
			@Parameter(description = "Email of the user who likes the question.", required = true)
			@Valid @PathVariable String email,
			@Parameter(description = "ID of the question the user likes.", required = true)
			@Valid @RequestBody Long questionId) {
		if (this.loginSystem.checkLoggedIn(unformatedJWT)) {
			if (faqService.getQuestionByID(questionId).isPresent()) {
				Optional<Question> updatedQuestion = faqService.getQuestionByID(questionId);
				List<String> dislikingUsers = updatedQuestion.get().getListNumDownvotes();
				// Has the user already disliked the question?
				if (dislikingUsers.contains(email)) {
					// Remove the dislike
					updatedQuestion.get().getListNumDownvotes().remove(email);
					updatedQuestion.get().setNumDownvotes(updatedQuestion.get().getNumDownvotes()-1);
					return faqService.saveQuestion(updatedQuestion.get());
				} else {
					List<String> likingUsers = updatedQuestion.get().getListNumUpvotes();
					// Has the user disliked the question before?
					if (likingUsers.contains(email)) {
						// Remove the dislike
						updatedQuestion.get().getListNumUpvotes().remove(email);
						updatedQuestion.get().setNumUpvotes(updatedQuestion.get().getNumUpvotes()-1);
					}
					updatedQuestion.get().getListNumDownvotes().remove(email);
					updatedQuestion.get().setNumDownvotes(updatedQuestion.get().getNumDownvotes()-1);
					return faqService.saveQuestion(updatedQuestion.get());
				}
			} else {
				throw new QuestionNotFoundException(questionId);
			}
		} else {
			throw new UnauthorizedDeviceException();
		}
	}

	@Operation(summary = "Get All FAQs by Language", description = "Get FAQs by the given language.", tags = {"question"})
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "successful operation",
					content = @Content(array = @ArraySchema(schema = @Schema(implementation = Question.class)))) })
	@GetMapping(value = "/wiki/faqs/{lang}", produces = { "application/json", "application/xml"})
	List<Question> all(
			@Parameter(required = false, hidden=true) @RequestHeader("Authorization") String unformatedJWT,
			@Parameter(description = "Language of the desired definitions. Must be esp or en", required = true)
			@Valid @PathVariable String lang) {
			if (this.loginSystem.checkLoggedIn(unformatedJWT)) {
				return faqService.getQuestionByLanguage(lang);
			} else {
				throw new UnauthorizedDeviceException();
			}
	}


	@Operation(summary = "Post a new Question", description = "Posts a new question to the FAQ. La primary key de la pregunta es su id.", tags = {"question"})
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "successful operation",
					content = @Content(array = @ArraySchema(schema = @Schema(implementation = Question.class)))) })
	@PostMapping(value = "/wiki/faqs/create", produces = { "application/json", "application/xml"})
	Question newQuestion(
			@Parameter(required = false, hidden=true) @RequestHeader("Authorization") String unformatedJWT,
			@Parameter(description = "Language of the desired definitions. Must be esp or en", required = true)
			@Valid @RequestBody Question newQue) throws NewQuestionBadRequest {
			if (this.loginSystem.checkLoggedIn(unformatedJWT)) {
				return this.faqService.saveQuestion(newQue);
			} else {
				throw new UnauthorizedDeviceException();
			}
	}

	@Operation(summary = "Delete a Question", description = "Deletes an existing question in the FAQ. La primary key de la pregunta es su id.", tags = {"question"})
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "successful operation",
					content = @Content(array = @ArraySchema(schema = @Schema(implementation = Question.class)))) })
	@DeleteMapping(value = "/wiki/faqs/delete/{id}", produces = { "application/json", "application/xml"})
	void deleteQuestion(
			@Parameter(required = false, hidden=true) @RequestHeader("Authorization") String unformatedJWT,
			@Parameter(description = "Id of the question you want to erase.", required = true)
			@Valid @PathVariable Long id) {
			if (this.loginSystem.checkLoggedIn(unformatedJWT)) {
				this.faqService.deleteById(id);
			} else {
				throw new UnauthorizedDeviceException();
			}
	}
}
