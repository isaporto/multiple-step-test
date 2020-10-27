class User < ApplicationRecord
  enum role: {
    admin: 0, # platform owner TERMINAL
    manager: 1, # company owner CREATED
    pj: 2, # liberal CREATED
    employee: 3, # funcionario da empresa INVITED
    translator: 4 # tradutor apenas confere documentos ja traduzidos (não envia) INVITED
  }

  validates :role, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
