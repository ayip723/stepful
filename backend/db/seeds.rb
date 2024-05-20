# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Coach.create!([{name: "Coach1", phone: "123-456-789"}, {name: "Coach2", phone: "234-567-8901"}])
Student.create!([{name: "Student1", phone: "223-456-789"}, {name: "Student2", phone: "334-567-8901"}])

# 6 slots in the past
Slot.new(coach_id: 1, student_id: 1, status: 'taken', start_time: '2023-05-24T18:00:00.000Z').save(validate: false)
Slot.new(coach_id: 1, student_id: 2, status: 'taken', start_time: '2023-05-23T18:00:00.000Z').save(validate: false)
Slot.new(coach_id: 1, status: 'open', start_time: '2023-05-22T10:00:00.000Z').save(validate: false)
Slot.new(coach_id: 2, student_id: 1, status: 'taken', start_time: '2023-05-21T18:00:00.000Z').save(validate: false)
Slot.new(coach_id: 2, student_id: 2, status: 'taken', start_time: '2023-05-20T18:00:00.000Z').save(validate: false)
Slot.new(coach_id: 2, status: 'open', start_time: '2023-05-19T10:00:00.000Z').save(validate: false)

# 4 slots in the future
Slot.create!([
    {coach_id: 1, start_time: '2025-05-24T18:00:00.000Z', status: 'open'},
    {coach_id: 1, start_time: '2025-05-23T10:00:00.000Z', status: 'open'},
    {coach_id: 2, start_time: '2025-05-22T18:00:00.000Z', status: 'open'},
    {coach_id: 2, start_time: '2025-05-21T10:00:00.000Z', status: 'open'}
])