package com.pesados.purplepoint.api.model.faq;


import java.util.List;
import java.util.Optional;


public interface FaqService {

	List<Faq> getFaqByLanguage(String language);

	Optional<Faq> getFaqByID(Long id);

	Faq saveFaq(Faq newFaq);

}
