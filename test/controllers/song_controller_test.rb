require 'test_helper'

class SongsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @song = create(:song)
  end

  test 'should get index' do
    get songs_url
    assert_response :success
  end

  test 'should get show' do
    get song_url(@song)
    assert_response :success
  end

  test 'should get new' do
    get new_song_url
    assert_response :success
  end

  test "should get edit" do
    get edit_song_url(@song)
    assert_response :success
  end

  test "should update song" do
    patch song_url(@song), params: { song: { name: 'NewName' } }
    assert_redirected_to song_url(@song)
  end

  test 'should create song' do
    song = FactoryBot.attributes_for :song
    song[:midifile] = fixture_file_upload(Rails.root.join('test', 'fixtures', 'files', 'example.mid'), 'audio/midi')

    assert_difference('Song.count') do
      post songs_url, params: { song: song }
    end

    assert_redirected_to song_url(Song.last)
  end

  test "should destroy song" do
    assert_difference('Song.count', -1) do
      delete song_url(@song)
    end

    assert_redirected_to songs_url
  end
end
