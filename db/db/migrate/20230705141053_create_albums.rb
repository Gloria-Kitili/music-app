class CreateAlbums < ActiveRecord::Migration[7.0]
  def change
    create_table :albums do |t|
      t.string :title
      t.integer :year
      t.string :image
      t.string :genre
      t.string :label
      t.integer :rating
      t.belongs_to :artist, null: false, foreign_key: true

      t.timestamps
    end
  end
end
