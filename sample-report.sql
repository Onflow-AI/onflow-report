-- Sample report insertion for testing
-- Run this in your Supabase SQL Editor after setting up the database

INSERT INTO onflow_reports (
  generated_at,
  url,
  num_personas,
  num_tests,
  successful_tests,
  failure_rate,
  personas,
  report_data
) VALUES (
  '2026-02-05T22:59:20.160Z',
  'https://runonflow.com',
  1,
  1,
  0,
  '100.0%',
  '[
      {
        "persona": {
          "name": "Alex Chen",
          "job_title": "Product Manager at a Series A Startup",
          "technical_proficiency": "intermediate",
          "goal": "Understand how Onflow''s AI agents can reduce manual QA testing time and identify UX friction points in their e-commerce checkout flow before launch",
          "motivation": "Alex needs to ship their product faster with higher quality. They''re frustrated with slow manual testing cycles and want to validate that Onflow can detect the same UX issues their users complain about. They want to see concrete examples of how the tool works and join the waitlist to get early access."
        },
        "results": {
          "success": false,
          "friction_points": [
            "Goal was not achievable - landed on a form submission confirmation page instead of Onflow''s e-commerce checkout flow",
            "No access to Onflow''s AI agents or QA testing tools",
            "No e-commerce checkout flow visible to evaluate",
            "No UX friction points in checkout process could be identified",
            "Unclear navigation path - form completion page does not relate to stated objective",
            "Missing context about what form was submitted or why"
          ],
          "positive_aspects": [
            "Clear confirmation message indicating successful form submission",
            "Clean, minimalist design of the confirmation page",
            "Prominent checkmark icon provides visual feedback",
            "Call-to-action button is clearly visible and accessible"
          ],
          "recommended_changes": "To properly evaluate Onflow''s AI agents for QA testing and UX friction points in e-commerce checkout: (1) Provide direct access to Onflow''s platform or a demo environment with their AI agent tools; (2) Create a realistic e-commerce checkout flow prototype or sandbox for testing; (3) Include specific QA testing scenarios and metrics to evaluate; (4) Provide documentation on how the AI agents identify and report UX friction points; (5) Establish clear success criteria for the evaluation task; (6) Ensure the testing environment includes common checkout friction points (payment validation, form errors, shipping options, etc.) that AI agents should detect."
        }
      }
    ]'::jsonb,
  '{
    "metadata": {
      "generated_at": "2026-02-05T22:59:20.160Z",
      "target_url": "https://runonflow.com",
      "num_personas": 1
    },
    "summary": {
      "total_tests": 1,
      "successful_tests": 0,
      "failure_rate": "100.0%"
    }
  }'::jsonb
) RETURNING id;

-- After running this, you'll get a UUID that you can use to access the report
-- Visit: /{the-returned-uuid}
