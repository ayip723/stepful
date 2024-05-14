class SlotsController < ApplicationController
  def take
    slot = Slot.find_by(id: params[:id], coach_id: params[:coach_id])
    if !slot
      render json: {error: "Slot doesn't exist."}
      return
    end

    if slot.student_id
      render json: {error: "Slot already taken."}
      return
    end
    slot.student_id = take_params[:student_id]
    
    if slot.save
      render json: slot, status: 200
    else
      render json: {error: "Error saving slot"}
    end
  end

  def index
    slots = Slot.where(coach_id: params[:coach_id])
    render json: slots
  end

  def show
    slot = Slot.find_by(coach_id: params[:coach_id], id: params[:id])
    render json: slot
  end

  def create
    coach = Coach.find(params[:coach_id])
    slot = coach.slots.create(start_time: slot_params[:start_time])
    if slot.persisted?
      render json: slot, status: 200
    else
      render json: {error: "Error creating review"}
    end
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
end
