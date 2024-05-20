class SlotsController < ApplicationController
  def take
    # slot = Slot.find_by(id: params[:id], coach_id: params[:coach_id])
    slot = Slot.find_by(id: params[:id])
    if !slot
      render json: {error: "Slot doesn't exist."}, status: 422
      return
    end

    if slot.student_id
      render json: {error: "Slot already taken."}, status: 422
      return
    end
    slot.student_id = params[:student_id]
    slot.status = 'taken'
    
    if slot.save
      render json: slot, status: 200
    else
      render json: {error: slot.errors.messages}, status: 422
    end
  end

  # def index
  #   if params[:coach_id]
  #     slots = Slot.where(coach_id: params[:coach_id]).includes(:student)
  #     render json: slots.to_json(include: :student)
  #   else
  #     slots = Slot.where(student_id: params[:student_id]).where('start_time > ?', DateTime.now).includes(:coach)
  #     render json: slots.to_json(include: :coach)
  #   end
  # end
  
  def show
    # slot = Slot.find_by(coach_id: params[:coach_id], id: params[:id])
    slot = Slot.find_by(id: params[:id])
    render json: slot.to_json(include: [:coach, :student])
  end
  
  def create
    coach = Coach.find(params[:coach_id])
    slot = coach.slots.create(start_time: slot_params[:start_time], status: 'open')
    if slot.persisted?
      render json: slot, status: 200
    else
      render json: {error: slot.errors.messages}, status: 422
    end
  end

  def complete
    slot = Slot.find_by(coach_id: params[:coach_id], id: params[:id])
    if !slot
      render json: {error: "Slot doesn't exist."}, status: 422
      return
    end
    slot.satisfaction = complete_params[:satisfaction]
    slot.notes = complete_params[:notes]
    slot.status = 'completed'
    if slot.save
      render json: slot, status: 200
    else
      render json: {error: slot.errors.messages}, status: 422
    end
  end

  def available
    slots = Slot.where(coach_id: params[:coach_id]).where(student_id: nil).where('start_time > ?', DateTime.now)
    render json: slots, status: 200
  end

  def coach_upcoming
    slots = Slot.where(coach_id: params[:coach_id]).where('start_time > ?', DateTime.now).includes(:student)
    render json: slots.to_json(include: :student), status: 200
  end

  def student_upcoming
    slots = Slot.where(student_id: params[:student_id]).where('start_time > ?', DateTime.now).includes(:coach)
    render json: slots.to_json(include: :coach)
  end

  def past
    slots = Slot.where(coach_id: params[:coach_id]).where('start_time < ?', DateTime.now).includes(:student)
    render json: slots.to_json(include: :student), status: 200
  end

  private
    def slot_params
      params.require(:slot).permit([
        :start_time
      ])
    end

    def take_params
      params.require(:slot).permit([
        :student_id
      ])
    end

    def complete_params
      params.require(:slot).permit([:satisfaction, :notes])
    end
end
