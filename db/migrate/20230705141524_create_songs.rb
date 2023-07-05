class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.string :title
      t.string :year
      t.string :featuring
      t.string :produced_by
      t.string :written_by
      t.string :image
      t.string :about
      t.string :music_video
      t.belongs_to :artist, null: false, foreign_key: true
      t.belongs_to :album, null: false, foreign_key: true

      t.timestamps
    end
  end
end
