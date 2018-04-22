FactoryBot.define do
  factory :song do
    name 'Song'
    author 'Author'
    description 'Description text'

    after(:build) do |song|
      song.midifile.attach(io: File.open(Rails.root.join('test', 'fixtures', 'files', 'example.mid')), filename: 'example.mid', content_type: 'audio/midi')
    end
  end
end
