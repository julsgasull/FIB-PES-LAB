package com.pesados.purplepoint.api.model.faq;

import io.swagger.v3.oas.annotations.media.Schema;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Collections;
import java.util.List;

public class Faq {
	@Schema(description = "Id of the definition.", required = true)
	private @Id @GeneratedValue Long faqId;

	@Schema(description = "Question", example="Question", required = true)
	@Column(name = "question", length = 2500)
	private String question;
	@Schema(description = "Answer to the question", example="Answer of the question", required = true)
	@Column(name = "answer", length = 2500)
	private String answer;
	@Schema(description = "List of votes", example=" List of users emails voters", required = true)
	@Column(name = "upvotes")
	private List<String> upvotes;
	@Schema(description = "List of downvotes", example=" List of users emails downvoters", required = true)
	@Column(name = "downvotes")
	private List<String> downvotes;
	@Schema(description = "Language of the definition.", example="esp", required = true)
	private String language;

	public Faq(String question, String answer, String language) {
		this.question = question;
		this.answer = answer;
		this.upvotes = Collections.<String>emptyList();;
		this.downvotes = Collections.<String>emptyList();;
		this.language = language;
	}

	public Long getFaqId() {
		return faqId;
	}

	public void setFaqId(Long faqId) {
		this.faqId = faqId;
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

	public List<String> getUpvotes() {
		return upvotes;
	}

	public void setUpvotes(List<String> upvotes) {
		this.upvotes = upvotes;
	}

	public List<String> getDownvotes() {
		return downvotes;
	}

	public void setDownvotes(List<String> downvotes) {
		this.downvotes = downvotes;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}
}
