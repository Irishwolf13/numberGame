class CharactersController < ApplicationController
  before_action :set_character, only: %i[ show edit update destroy ]

  # GET /characters or /characters.json
  def index
    @characters = Character.all
  end

  # GET /characters/1 or /characters/1.json
  def show
  end

  # GET /characters/new
  def new
    @character = Character.new
  end

  # GET /characters/1/edit
  def edit
  end

  # POST /characters or /characters.json
  def create
    @character = Character.new(character_params)
  
    if @character.save
      render json: @character, status: :created, location: @character
    else
      render json: @character.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /characters/1 or /characters/1.json
  def update
    if @character.update(character_params)
      render json: @character, status: :ok
    else
      render json: @character.errors, status: :unprocessable_entity
    end
  end

  # DELETE /characters/1 or /characters/1.json
  def destroy
    @character.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_character
      @character = Character.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def character_params
      params.require(:character).permit(:name, :gender, :clothing, :feature, :charm, :cool, :sharp, :tough, :weird, :luck, :harm, :experience, :level, :history, :user_id)
    end
end
