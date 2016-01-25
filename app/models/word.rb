class Word < ActiveRecord::Base
  belongs_to :preference

  def self.create_words(words_array, custom_filter_obj)
    words_array.each do |word|
      if !word.match(/\d/) && !word.blank?
        Word.create!(word: word.downcase.strip, preference: custom_filter_obj)
      end
    end
  end
end
