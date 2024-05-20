class AddStatusToSlots < ActiveRecord::Migration[7.1]
  def change
    add_column :slots, :status, :string
  end
end
