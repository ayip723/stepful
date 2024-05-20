class CoachesController < ApplicationController
    def index
        coaches = Coach.all
        render json: coaches
    end

    def show
        coach = Coach.find(params[:id])
        render json: coach
    end
end
