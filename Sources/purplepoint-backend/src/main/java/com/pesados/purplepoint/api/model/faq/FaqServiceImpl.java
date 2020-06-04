package com.pesados.purplepoint.api.model.faq;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FaqServiceImpl implements FaqService {

	@Autowired
	FaqRepository faqRepository;

	@Override
	public List<Faq> getFaqByLanguage(String language) {
		return faqRepository.findByLanguage(language);
	}

	@Override
	public Optional<Faq> getFaqByID(Long id) {
		return faqRepository.findById(id);
	}

	@Override
	public Faq saveFaq(Faq newFaq) {
		return faqRepository.save(newFaq);
	}
}
