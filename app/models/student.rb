class Student < ApplicationRecord
  belongs_to :teacher
  validates :name, :subject, :marks, :presence => true
end
