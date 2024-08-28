FactoryBot.define do
    factory :teacher do
      email { Faker::Internet.email }
      password { 'password' }
    end
end
  