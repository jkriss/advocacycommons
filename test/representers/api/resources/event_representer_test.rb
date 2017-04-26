require 'test_helper'

class Api::Resources::EventRepresenterTest < ActiveSupport::TestCase
  test 'from_json' do
    event = Event.new
    Api::Resources::EventRepresenter.new(event).from_json('{"name":"Womens March PDX"}')
    assert_equal 'Womens March PDX', event.name
  end

  test 'organizer link' do
    event = Event.new
    representer = Api::Resources::EventRepresenter.new(event)
    representer.from_json('{"name":"Womens March PDX", "_links": {"osdi:organizer": {"href": "https://actionnetwork.org/api/v2/people/8a625981-67a4-4457-8b55-2e30b267b2c2"}}}')
    assert_equal(
      'https://actionnetwork.org/api/v2/people/8a625981-67a4-4457-8b55-2e30b267b2c2',
      representer.links['osdi:organizer']&.href
    )
  end
end
