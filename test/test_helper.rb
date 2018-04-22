ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require "minitest/autorun"

class ActiveSupport::TestCase
  fixtures :all

  # Add more helper methods to be used by all tests here...
end
