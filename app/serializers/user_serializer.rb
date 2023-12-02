class UserSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :email
end
