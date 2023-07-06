class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  has_many :user_artists
  has_many :user_albums
  has_many :user_songs 
  has_many :added_comments
  
  has_many :song_videos
  has_many :songs, through: :song_videos 
  has_secure_password
end
