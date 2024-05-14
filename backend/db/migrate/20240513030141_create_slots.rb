class CreateSlots < ActiveRecord::Migration[7.1]
  def change
    create_table :slots do |t|
      t.integer :coach_id
      t.integer :student_id
      t.datetime :start_time
      t.integer :satisfaction
      t.text :notes

      t.timestamps
    end
  end
end
