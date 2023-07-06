class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :title, :year, :image, :genre, :label, :rating, :artist_id
  has_one :artist
  has_many :songs
end
