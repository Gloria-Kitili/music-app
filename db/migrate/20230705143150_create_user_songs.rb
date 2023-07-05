class CreateUserSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :user_songs do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :song, null: false, foreign_key: true

      t.timestamps
    end
  end
end
