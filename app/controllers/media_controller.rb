class MediaController < ApplicationController

  def new
  end

  def create
    new_media = Media.new(title: params[:media][:title], category: Category.find_by(category_type: 'Custom'))
    if new_media.save
      redirect_to "/media/#{new_media.id}/words"
    else
      redirect_to new_category_media_path(params[:category_id])
    end
  end

end
