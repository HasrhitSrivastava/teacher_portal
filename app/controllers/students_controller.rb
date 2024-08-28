class StudentsController < ApplicationController
  before_action :authenticate_teacher!
  before_action :set_student, only: [:edit, :update, :destroy]

  def index
    @students = current_teacher.students
  end

  def create
    student = current_teacher.students.find_or_initialize_by(name: student_params[:name], subject: student_params[:subject])
    if student.persisted?
      student.update(marks: student.marks + student_params[:marks].to_i)
    else
      student.assign_attributes(student_params)
      student.save
    end
    redirect_to students_path
  end

  def edit
    render json: @student, status: :ok
  end

  def update
    if @student.update(student_params)
      render json: @student, status: :ok
    else
      render json: { errors: @student.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @student.destroy
    head :no_content
  end

  private

  def set_student
    @student = current_teacher.students.find(params[:id])
  end

  def student_params
    params.require(:student).permit(:name, :subject, :marks)
  end
end
