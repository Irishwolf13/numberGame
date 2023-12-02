class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :gender, :clothing, :feature, :charm, :cool, :sharp, :tough, :weird, :luck, :harm, :experience, :level, :history
  has_one :user
end
