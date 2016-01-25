class User < ActiveRecord::Base

  has_secure_password

  has_many :preferences
  has_many :filters, through: :preference, source: 'media'

  validates :username, :email, :active, presence: true
  validates_uniqueness_of :username, :email
  validates :username, length: { minimum: 4 }
  validates :password, length: { minimum: 6 }
  validates :email, :format => { :with => /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }


  def self.active_words(preferences)
    list_of_words = []
    preferences.each do |preference|
      preference.words.each do |word|
        list_of_words << word.word
      end
    end
    list_of_words
  end
end
