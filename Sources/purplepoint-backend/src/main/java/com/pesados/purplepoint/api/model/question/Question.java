package com.pesados.purplepoint.api.model.question;

import io.swagger.v3.oas.annotations.media.Schema;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Question")
public class Question {
	@Schema(description = "Id of the definition.", required = true)
	private @Id
	Long questionId;

	@Schema(description = "Question", example = "Question", required = true)
	@Column(name = "question", length = 2500)
	private String question;
	@Schema(description = "Answer to the question", example = "Answer of the question", required = true)
	@Column(name = "answer", length = 2500)
	private String answer;
	@Schema(description = "Number of votes", example = " List of users emails voters", required = true)
	@Column(name = "numUpvotes")
	private long numUpvotes;
	@Schema(description = "Number of downvotes", example = " List of users emails downvoters", required = true)
	@Column(name = "numDownvotes")
	private long numDownvotes;
	@ElementCollection(targetClass = String.class)
	@Schema(description = "List of votes", example = " List of users emails voters", required = true)
	@Column(name = "listUpvotes")
	private List<String> listNumUpvotes;
	@ElementCollection(targetClass = String.class)
	@Schema(description = "List of downvotes", example = " List of users emails downvoters", required = true)
	@Column(name = "listDownvotes")
	private List<String> listNumDownvotes;
	@Schema(description = "Language of the definition.", example = "esp", required = true)
	private String language;

	public Question() {

	}

	public Question(String question, String answer, String language) {
		this.question = question;
		this.answer = answer;
		this.language = language;
		this.numUpvotes = 0;
		this.numDownvotes = 0;
		this.listNumUpvotes = new ArrayList<>();
		this.listNumDownvotes = new ArrayList<>();
	}

	public Long getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Long questionId) {
		this.questionId = questionId;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public long getNumUpvotes() {
		return numUpvotes;
	}

	public void setNumUpvotes(long numUpvotes) {
		this.numUpvotes = numUpvotes;
	}

	public long getNumDownvotes() {
		return numDownvotes;
	}

	public void setNumDownvotes(long numDownvotes) {
		this.numDownvotes = numDownvotes;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public List<String> getListNumUpvotes() {
		return listNumUpvotes;
	}

	public void setListNumUpvotes(List<String> listNumUpvotes) {
		this.listNumUpvotes = listNumUpvotes;
	}

	public List<String> getListNumDownvotes() {
		return listNumDownvotes;
	}

	public void setListNumDownvotes(List<String> listNumDownvotes) {
		this.listNumDownvotes = listNumDownvotes;
	}
}
