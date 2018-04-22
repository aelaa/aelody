ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require "minitest/autorun"

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods
end
