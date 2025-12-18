// src/utils/formQuestions.js

export const QUESTION_MAPPING = {
  // --- LEVEL 1 SCREENER (The main entry form) ---
  'level-1-adult': {
    q1: "Little interest or pleasure in doing things?",
    q2: "Feeling down, depressed, or hopeless?",
    q3: "Feeling more irritated, grouchy, or angry than usual?",
    q4: "Sleeping less than usual, but still have a lot of energy?",
    q5: "Starting lots more projects than usual or doing more risky things?",
    q6: "Feeling nervous, anxious, frightened, worried, or on edge?",
    q7: "Feeling panic or being frightened?",
    q8: "Avoiding situations that make you anxious?",
    q9: "Unexplained aches and pains?",
    q10: "Feeling that your illnesses are not being taken seriously enough?",
    q11: "Thoughts of actually hurting yourself?",
    q12: "Hearing things other people couldn't hear, such as voices?",
    q13: "Feeling that someone could hear your thoughts?",
    q14: "Problems with sleep that affected your sleep quality?",
    q15: "Problems with memory or ability to focus?",
  },

  // --- LEVEL 2: DEPRESSION (PHQ-9) ---
  'level-2-depression': {
    q1: "Little interest or pleasure in doing things",
    q2: "Feeling down, depressed, or hopeless",
    q3: "Trouble falling or staying asleep, or sleeping too much",
    q4: "Feeling tired or having little energy",
    q5: "Poor appetite or overeating",
    q6: "Feeling bad about yourself — or that you are a failure",
    q7: "Trouble concentrating on things",
    q8: "Moving or speaking so slowly that other people could have noticed",
    q9: "Thoughts that you would be better off dead or of hurting yourself",
  },

  // --- LEVEL 2: ANXIETY (GAD-7) ---
  'level-2-anxiety': {
    q1: "Feeling nervous, anxious, or on edge",
    q2: "Not being able to stop or control worrying",
    q3: "Worrying too much about different things",
    q4: "Trouble relaxing",
    q5: "Being so restless that it is hard to sit still",
    q6: "Becoming easily annoyed or irritable",
    q7: "Feeling afraid, as if something awful might happen",
  },
  
};

// Standard answer key (0-4 scale)
export const ANSWER_MAPPING = {
  0: "None / Not at all",
  1: "Slight / Rare",
  2: "Mild / Several days",
  3: "Moderate / More than half the days",
  4: "Severe / Nearly every day"
};