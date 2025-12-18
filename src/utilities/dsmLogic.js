export const determineNextSteps = (formId, formData) => {
  const recommendations = [];
  let requiresAppointment = false;

  // --- LOGIC FOR LEVEL 1 SCREENER (The Entry Point) ---
  if (formId === 'level-1-adult') {
    
    // 1. DEPRESSION (Questions 1 & 2) -> Score >= 2 triggers PHQ-9
    if (formData.q1 >= 2 || formData.q2 >= 2) {
      recommendations.push({
        type: 'form',
        id: 'level-2-depression', 
        name: 'Level 2: Depression (PHQ-9)',
        reason: 'Patient reported mild or greater interest/mood issues (Score >= 2).'
      });
    }

    // 2. ANGER (Question 3) -> Score >= 2 triggers PROMIS Anger
    if (formData.q3 >= 2) {
      recommendations.push({
        type: 'form',
        id: 'level-2-anger',
        name: 'Level 2: Anger (PROMIS Short Form)',
        reason: 'Patient reported feeling annoyed/angry/irritated.'
      });
    }

    // 3. MANIA (Questions 4 & 5) -> Score >= 2 triggers Altman Mania Scale
    if (formData.q4 >= 2 || formData.q5 >= 2) {
      recommendations.push({
        type: 'form',
        id: 'altman-mania',
        name: 'Altman Self-Rating Mania Scale (ASRM)',
        reason: 'Patient reported manic symptoms (sleeping less, high energy).'
      });
    }

    // 4. ANXIETY (Questions 6-8) -> Score >= 2 triggers GAD-7
    if (formData.q6 >= 2 || formData.q7 >= 2 || formData.q8 >= 2) {
      recommendations.push({
        type: 'form',
        id: 'level-2-anxiety',
        name: 'Level 2: Anxiety (GAD-7)',
        reason: 'Patient reported anxiety/worry thresholds.'
      });
    }

    // 5. SUICIDAL IDEATION (Question 11) -> CRITICAL FLAG
    if (formData.q11 >= 1) {
      return {
        action: 'EMERGENCY',
        messages: ['Patient reported Suicidal Ideation. Immediate Safety Plan Required.'],
        suggestions: [{
            type: 'appointment',
            name: 'Urgent Safety Evaluation',
            reason: 'Critical Item: Suicidal thoughts reported.'
        }]
      };
    }
  }

  // --- LOGIC FOR LEVEL 2 FORMS (The Follow-up) ---
  // If they just finished a specific test (PHQ-9, GAD-7), send them to the doctor.
  else if (['level-2-depression', 'level-2-anxiety', 'phq-9', 'gad-7'].includes(formId)) {
    requiresAppointment = true;
    recommendations.push({
      type: 'appointment',
      name: 'Clinical Diagnosis Interview',
      reason: 'Detailed symptom profile collected. Clinician review needed.'
    });
  }

  // --- DEFAULT FALLBACK ---
  if (recommendations.length === 0) {
    recommendations.push({
      type: 'appointment',
      name: 'Routine Follow-up',
      reason: 'No critical thresholds met on screening.'
    });
  }

  return {
    action: requiresAppointment ? 'SCHEDULE' : 'ASSIGN_FORM',
    suggestions: recommendations
  };
};