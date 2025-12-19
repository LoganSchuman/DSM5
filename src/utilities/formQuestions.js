export const QUESTION_MAPPING = {
  // --- LEVEL 1 SCREENER ---
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
  
  // --- LEVEL 2 FORMS ---
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
  'level-2-anxiety': {
    q1: "Feeling nervous, anxious, or on edge",
    q2: "Not being able to stop or control worrying",
    q3: "Worrying too much about different things",
    q4: "Trouble relaxing",
    q5: "Being so restless that it is hard to sit still",
    q6: "Becoming easily annoyed or irritable",
    q7: "Feeling afraid, as if something awful might happen",
  },

  // --- SYSTEM FORMS (These were missing) ---
  
  'phq-9': {
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

  'gad-7': {
    q1: "Feeling nervous, anxious, or on edge",
    q2: "Not being able to stop or control worrying",
    q3: "Worrying too much about different things",
    q4: "Trouble relaxing",
    q5: "Being so restless that it is hard to sit still",
    q6: "Becoming easily annoyed or irritable",
    q7: "Feeling afraid, as if something awful might happen",
  },

  'asrs': {
    q1: "How often do you have trouble wrapping up the final details of a project?",
    q2: "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
    q3: "How often do you have problems remembering appointments or obligations?",
    q4: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
    q5: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
    q6: "How often do you feel overly active and compelled to do things, like you were driven by a motor?",
  },

  'pcl-5': {
    q1: "Repeated, disturbing, and unwanted memories of the stressful experience?",
    q2: "Repeated, disturbing dreams of the stressful experience?",
    q3: "Suddenly feeling or acting as if the stressful experience were actually happening again?",
    q4: "Feeling very upset when something reminded you of the stressful experience?",
    q5: "Having strong physical reactions when something reminded you of the stressful experience?",
    q6: "Avoiding memories, thoughts, or feelings related to the stressful experience?",
    q7: "Avoiding external reminders of the stressful experience?",
    q8: "Trouble remembering important parts of the stressful experience?",
    q9: "Having strong negative beliefs about yourself, other people, or the world?",
    q10: "Blaming yourself or someone else for the stressful experience or what happened after it?",
    q11: "Having strong negative feelings such as fear, horror, anger, guilt, or shame?",
    q12: "Loss of interest in activities that you used to enjoy?",
    q13: "Feeling distant or cut off from other people?",
    q14: "Trouble experiencing positive feelings?",
    q15: "Irritable behavior, angry outbursts, or acting aggressively?",
    q16: "Taking too many risks or doing things that could cause you harm?",
    q17: "Being 'superalert' or watchful or on guard?",
    q18: "Feeling jumpy or easily startled?",
    q19: "Having difficulty concentrating?",
    q20: "Trouble falling or staying asleep?",
  },
  
  'audit': {
    q1: "How often do you have a drink containing alcohol?",
    q2: "How many drinks containing alcohol do you have on a typical day when you are drinking?",
    q3: "How often do you have six or more drinks on one occasion?",
    q4: "How often during the last year have you found that you were not able to stop drinking once you had started?",
    q5: "How often during the last year have you failed to do what was normally expected of you because of drinking?",
    q6: "How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?",
    q7: "How often during the last year have you had a feeling of guilt or remorse after drinking?",
    q8: "How often during the last year have you been unable to remember what happened the night before because of your drinking?",
    q9: "Have you or someone else been injured because of your drinking?",
    q10: "Has a relative, friend, doctor, or other health care worker been concerned about your drinking or suggested you cut down?",
  }
};

export const ANSWER_MAPPING = {
  0: "Not at all",
  1: "Several days",
  2: "More than half the days",
  3: "Nearly every day"
};