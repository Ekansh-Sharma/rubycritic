# frozen_string_literal: true

module RubyCritic
  class AnalysisSummary
    def self.generate(analysed_modules)
      new(analysed_modules).generate
    end

    def initialize(analysed_modules)
      @analysed_modules = analysed_modules
    end

    def generate
      %w(A B C D F).each_with_object({}) do |rating, summary|
        summary[rating] = generate_for(rating)
      end
    end

    private

    attr_reader :analysed_modules

    def generate_for(rating)
      rating_modules = analysed_modules.for_rating(rating)

      {
        files: rating_modules.count,
        churns: rating_modules.inject(0) { |acc, elem| acc + elem.churn },
        smells: rating_modules.inject(0) { |acc, elem| acc + elem.smells.count }
      }
    end
  end
end
