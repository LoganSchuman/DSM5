// src/utils/form_configs.js

export const FORM_CONFIGS = {
  // --- PHQ-9 ---
  'phq-9': {
    title: 'PHQ-9 (Patient Health Questionnaire-9)',
    description: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
    sections: [
      {
        title: null, // No section header needed
        optionsType: 'frequency_0_3', // Reference to a common option set
        questions: [
          { id: 'q1', text: 'Little interest or pleasure in doing things?' },
          { id: 'q2', text: 'Feeling down, depressed, or hopeless?' },
          { id: 'q3', text: 'Trouble falling or staying asleep, or sleeping too much?' },
          { id: 'q4', text: 'Feeling tired or having little energy?' },
          { id: 'q5', text: 'Poor appetite or overeating?' },
          { id: 'q6', text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down?' },
          { id: 'q7', text: 'Trouble concentrating on things, such as reading the newspaper or watching television?' },
          { id: 'q8', text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual?' },
          { id: 'q9', text: 'Thoughts that you would be better off dead or of hurting yourself in some way?' }
        ]
      }
    ],
    calculateScore: (answers) => {
      let total = 0;
      Object.entries(answers).forEach(([k, v]) => { if(k.startsWith('q')) total += parseInt(v || 0) });
      let result = 'None-Minimal';
      if (total >= 20) result = 'Severe Depression';
      else if (total >= 15) result = 'Moderately Severe Depression';
      else if (total >= 10) result = 'Moderate Depression';
      else if (total >= 5) result = 'Mild Depression';
      return { score: total, interpretation: result };
    }
  },

  // --- GAD-7 ---
  'gad-7': {
    title: 'GAD-7 (Generalized Anxiety Disorder-7)',
    description: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
    sections: [
      {
        optionsType: 'frequency_0_3',
        questions: [
          { id: 'q1', text: 'Feeling nervous, anxious, or on edge' },
          { id: 'q2', text: 'Not being able to stop or control worrying' },
          { id: 'q3', text: 'Worrying too much about different things' },
          { id: 'q4', text: 'Trouble relaxing' },
          { id: 'q5', text: 'Being so restless that it is hard to sit still' },
          { id: 'q6', text: 'Becoming easily annoyed or irritable' },
          { id: 'q7', text: 'Feeling afraid as if something awful might happen' }
        ]
      }
    ],
    calculateScore: (answers) => {
      let total = 0;
      Object.values(answers).forEach(v => total += parseInt(v || 0));
      let result = 'Minimal Anxiety';
      if (total >= 15) result = 'Severe Anxiety';
      else if (total >= 10) result = 'Moderate Anxiety';
      else if (total >= 5) result = 'Mild Anxiety';
      return { score: total, interpretation: result };
    }
  },

  // --- PCL-5 (PTSD) ---
  'pcl-5': {
    title: 'PCL-5 (PTSD Checklist)',
    description: 'Indicate how much you have been bothered by that problem in the past month.',
    sections: [
      {
        title: 'Criterion B: Intrusion Symptoms',
        optionsType: 'intensity_0_4',
        questions: [
          { id: 'q1', text: 'Repeated, disturbing, and unwanted memories of the stressful experience?' },
          { id: 'q2', text: 'Repeated, disturbing dreams of the stressful experience?' },
          { id: 'q3', text: 'Suddenly feeling or acting as if the stressful experience were actually happening again?' },
          { id: 'q4', text: 'Feeling very upset when something reminded you of the stressful experience?' },
          { id: 'q5', text: 'Having strong physical reactions when something reminded you of the stressful experience?' }
        ]
      },
      {
        title: 'Criterion C: Avoidance',
        optionsType: 'intensity_0_4',
        questions: [
          { id: 'q6', text: 'Avoiding memories, thoughts, or feelings related to the stressful experience?' },
          { id: 'q7', text: 'Avoiding external reminders of the stressful experience?' }
        ]
      },
      {
        title: 'Criterion D: Negative Alterations',
        optionsType: 'intensity_0_4',
        questions: [
          { id: 'q8', text: 'Trouble remembering important parts of the stressful experience?' },
          { id: 'q9', text: 'Having strong negative beliefs about yourself, other people, or the world?' },
          { id: 'q10', text: 'Blaming yourself or someone else for the stressful experience?' },
          { id: 'q11', text: 'Having strong negative feelings such as fear, horror, anger, guilt, or shame?' },
          { id: 'q12', text: 'Loss of interest in activities that you used to enjoy?' },
          { id: 'q13', text: 'Feeling distant or cut off from other people?' },
          { id: 'q14', text: 'Trouble experiencing positive feelings?' }
        ]
      },
      {
        title: 'Criterion E: Alterations in Arousal',
        optionsType: 'intensity_0_4',
        questions: [
          { id: 'q15', text: 'Irritable behavior, angry outbursts, or acting aggressively?' },
          { id: 'q16', text: 'Taking too many risks or doing things that could cause you harm?' },
          { id: 'q17', text: 'Being "superalert" or watchful or on guard?' },
          { id: 'q18', text: 'Feeling jumpy or easily startled?' },
          { id: 'q19', text: 'Having difficulty concentrating?' },
          { id: 'q20', text: 'Trouble falling or staying asleep?' }
        ]
      }
    ],
    calculateScore: (answers) => {
      let total = 0;
      Object.values(answers).forEach(v => total += parseInt(v || 0));
      return { score: total, interpretation: total >= 33 ? 'Probable PTSD' : 'Below Threshold' };
    }
  },

  // --- MDQ (Mood Disorder) ---
  'mdq': {
    title: 'MDQ (Mood Disorder Questionnaire)',
    description: 'Has there ever been a period of time when you were not your usual self and...',
    sections: [
      {
        title: 'Symptoms',
        optionsType: 'yes_no',
        questions: [
          { id: 'q1', text: 'You felt so good or so hyper that other people thought you were not your normal self?' },
          { id: 'q2', text: 'You were so irritable that you shouted at people or started fights or arguments?' },
          { id: 'q3', text: 'You felt much more self-confident than usual?' },
          { id: 'q4', text: 'You got much less sleep than usual and found you didn’t really miss it?' },
          { id: 'q5', text: 'You were much more talkative or spoke much faster than usual?' },
          { id: 'q6', text: 'Thoughts raced through your head or you couldn’t slow your mind down?' },
          { id: 'q7', text: 'You were so easily distracted by things around you?' },
          { id: 'q8', text: 'You had much more energy than usual?' },
          { id: 'q9', text: 'You were much more active or did many more things than usual?' },
          { id: 'q10', text: 'You were much more social or outgoing than usual?' },
          { id: 'q11', text: 'You were much more interested in sex than usual?' },
          { id: 'q12', text: 'You did things that were unusual for you or that other people might have thought were excessive?' },
          { id: 'q13', text: 'Spending money got you or your family into trouble?' }
        ]
      },
      {
        title: 'Timing & Impact',
        questions: [
          { 
            id: 'concurrent', 
            text: 'If you checked YES to more than one of the above, have several of these ever happened during the same period of time?',
            customOptions: [{text: 'Yes', value: 'yes'}, {text: 'No', value: 'no'}] 
          },
          { 
            id: 'impact', 
            text: 'How much of a problem did any of these cause you?',
            customOptions: [
              {text: 'No Problem', value: 'none'}, {text: 'Minor Problem', value: 'minor'},
              {text: 'Moderate Problem', value: 'moderate'}, {text: 'Serious Problem', value: 'serious'}
            ]
          }
        ]
      }
    ],
    calculateScore: (answers) => {
      let yesCount = 0;
      for(let i=1; i<=13; i++) { if(answers[`q${i}`] === 'yes') yesCount++; }
      
      const concurrent = answers['concurrent'] === 'yes';
      const impact = ['moderate', 'serious'].includes(answers['impact']);
      const positive = (yesCount >= 7 && concurrent && impact);
      
      return { 
        score: yesCount, 
        interpretation: positive ? 'Positive Screen for Bipolar Spectrum' : 'Negative Screen' 
      };
    }
  },

  // --- ASRS (ADHD) ---
  'asrs': {
    title: 'ASRS v1.1 (ADHD Screener)',
    description: 'Select the box that best describes how you have felt and conducted yourself over the past 6 months.',
    sections: [
      {
        optionsType: 'frequency_0_4',
        questions: [
          { id: 'q1', text: 'How often do you have trouble wrapping up the final details of a project?', threshold: 2 },
          { id: 'q2', text: 'How often do you have difficulty getting things in order when you have to do a task that requires organization?', threshold: 2 },
          { id: 'q3', text: 'How often do you have problems remembering appointments or obligations?', threshold: 2 },
          { id: 'q4', text: 'When you have a task that requires a lot of thought, how often do you avoid or delay getting started?', threshold: 3 },
          { id: 'q5', text: 'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?', threshold: 3 },
          { id: 'q6', text: 'How often do you feel overly active and compelled to do things, like you were driven by a motor?', threshold: 3 }
        ]
      }
    ],
    calculateScore: (answers, config) => {
      let positiveCount = 0;
      // Access thresholds defined in questions above
      const questions = config.sections[0].questions;
      questions.forEach(q => {
        const val = parseInt(answers[q.id] || 0);
        if(val >= q.threshold) positiveCount++;
      });
      return { 
        score: positiveCount, 
        interpretation: positiveCount >= 4 ? 'Positive Screen for ADHD' : 'Negative Screen' 
      };
    }
  }
}

// Reusable Option Sets
export const OPTION_SETS = {
  frequency_0_3: [
    { text: 'Not at all (0)', value: '0' },
    { text: 'Several days (1)', value: '1' },
    { text: 'More than half the days (2)', value: '2' },
    { text: 'Nearly every day (3)', value: '3' }
  ],
  frequency_0_4: [
    { text: 'Never (0)', value: '0' },
    { text: 'Rarely (1)', value: '1' },
    { text: 'Sometimes (2)', value: '2' },
    { text: 'Often (3)', value: '3' },
    { text: 'Very Often (4)', value: '4' }
  ],
  intensity_0_4: [
    { text: 'Not at all (0)', value: '0' },
    { text: 'A little bit (1)', value: '1' },
    { text: 'Moderately (2)', value: '2' },
    { text: 'Quite a bit (3)', value: '3' },
    { text: 'Extremely (4)', value: '4' }
  ],
  yes_no: [
    { text: 'Yes', value: 'yes' },
    { text: 'No', value: 'no' }
  ]
}