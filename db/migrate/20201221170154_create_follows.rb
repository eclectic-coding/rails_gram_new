class CreateFollows < ActiveRecord::Migration[6.1]
  def change
    create_table :follows do |t|
      t.bigint :follower_id
      t.bigint :following_id

      t.timestamps
    end
  end
end
