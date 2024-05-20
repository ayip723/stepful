class Slot < ApplicationRecord
    belongs_to :coach
    # There will be rolling back if I don't set it optional.
    belongs_to :student, optional: true
    validate :start_time_after_now, on: :create
    validate :close_after_start_time, on: :update
    validates :status, inclusion: { in: %w(open taken completed), message: "%{value} is not a valid status." }
    validates :start_time, uniqueness: { scope: :coach_id, message: "Can't create duplicate slot for a coach at %{value}." }

    def start_time_after_now
        if start_time <= DateTime.now
            errors.add(:start_time, "Can't be in the past.")
        end
    end

    def close_after_start_time
        if start_time >= DateTime.now && status == 'completed'
            errors.add(:status, "Can't close before start time.")
        end
    end
end
