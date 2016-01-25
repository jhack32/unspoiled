class WordsController < ApplicationController
  def new
  end

  def create
    new_word_array = params[:word][:word].split(/[\,][ ]/)
    media = Media.find_by(id: params[:media_id])
    new_preference = media.preferences.new(user: current_user)
    if new_preference.save
      Word.create_words(new_word_array, new_preference)
    end
    redirect_to user_path(current_user.id)
  end
end
