class CreateCharacters < ActiveRecord::Migration[7.0]
  def change
    create_table :characters do |t|
      t.string :name
      t.string :gender
      t.string :clothing
      t.string :feature
      t.integer :charm
      t.integer :cool
      t.integer :sharp
      t.integer :tough
      t.integer :weird
      t.integer :luck
      t.integer :harm
      t.integer :experience
      t.integer :level
      t.text :history
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
