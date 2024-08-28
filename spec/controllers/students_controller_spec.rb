require 'rails_helper'

RSpec.describe StudentsController, type: :controller do
  let!(:teacher) { FactoryBot.create(:teacher) }
  let!(:student) { FactoryBot.create(:student, teacher: teacher) }

  before do
    sign_in teacher
  end

  describe 'GET #index' do
    it 'returns a success response' do
      get :index
      expect(response).to be_successful
      expect(assigns(:students)).to include(student)
    end
  end

  describe 'POST #create' do
    let(:valid_attributes) { { student: { name: 'New Student', subject: 'Math', marks: 95 } } }
    let(:invalid_attributes) { { student: { name: '', subject: 'Math', marks: 95 } } }

    context 'with valid parameters' do
      it 'creates a new Student' do
        expect {
          post :create, params: valid_attributes
        }.to change(Student, :count).by(1)
      end

      it 'redirects to the students list' do
        post :create, params: valid_attributes
        expect(response).to redirect_to(students_path)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Student' do
        expect {
          post :create, params: invalid_attributes
        }.to_not change(Student, :count)
      end

      it 'redirects to the students list' do
        post :create, params: invalid_attributes
        expect(response).to redirect_to(students_path)
      end
    end
  end

  describe 'GET #edit' do
    it 'returns a success response' do
      get :edit, params: { id: student.id }, as: :json
      expect(response).to be_successful
      expect(response.body).to include(student.name)
    end
  end

  describe 'PATCH #update' do
    let(:new_attributes) { { student: { name: 'Updated Name', marks: 100 } } }

    context 'with valid parameters' do
      it 'updates the requested student' do
        patch :update, params: { id: student.id, student: new_attributes[:student] }, as: :json
        student.reload
        expect(student.name).to eq('Updated Name')
        expect(student.marks).to eq(100)
      end

      it 'renders a JSON response with the student' do
        patch :update, params: { id: student.id, student: new_attributes[:student] }, as: :json
        expect(response).to be_successful
        expect(response.body).to include('Updated Name')
      end
    end

    context 'with invalid parameters' do
      it 'renders a JSON response with errors for the student' do
        patch :update, params: { id: student.id, student: { name: '' } }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include("Name can't be blank")
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested student' do
      expect {
        delete :destroy, params: { id: student.id }
      }.to change(Student, :count).by(-1)
    end

    it 'returns a no content response' do
      delete :destroy, params: { id: student.id }
      expect(response).to have_http_status(:no_content)
    end
  end
end
