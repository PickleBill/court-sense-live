// CourtSense AI — Embedded Clip Analysis Data (v1)
// 15 clips with full Gemini analysis structure

export interface ClipAnalysis {
  _source_url: string;
  _highlight_meta?: {
    id: string;
    name: string;
    type: "standard" | "panel" | "full_match";
    group_id: string;
  };
  analyzed_at: string;
  model_used: string;
  clip_meta: {
    duration_seconds: number;
    clip_quality_score: number;
    viral_potential_score: number;
    watchability_score: number;
    cinematic_score: number;
  };
  players_detected: Array<{
    approximate_position: string;
    side: string;
    dominance_in_clip: "primary" | "secondary" | "background";
    estimated_skill_level: "beginner" | "intermediate" | "advanced" | "elite";
    energy_level: string;
    handedness: string;
    height_estimate: string;
    movement_style: string;
    apparel_summary: string;
  }>;
  shot_analysis: {
    shots: Array<{
      shot_type: string;
      player_position: string;
      quality_score: number;
      difficulty_score: number;
      outcome: string;
      wow_factor: number;
      timestamp_approximate_seconds: number;
    }>;
    dominant_shot_type: string;
    total_shots_estimated: number;
    rally_length_estimated: number;
  };
  skill_indicators: {
    court_coverage_rating: number;
    kitchen_mastery_rating: number;
    power_game_rating: number;
    touch_and_feel_rating: number;
    athleticism_rating: number;
    creativity_rating: number;
    court_iq_rating: number;
    consistency_rating: number;
  };
  brand_detection: {
    brands: Array<{
      brand_name: string;
      category: string;
      confidence: "high" | "medium" | "low";
      player_side: string;
      visibility_quality: string;
      estimated_visible_seconds: number;
      color_scheme_noted: string;
    }>;
    total_brands_detected: number;
    sponsorship_whitespace: string[];
  };
  badge_intelligence: {
    predicted_badges: Array<{
      badge_name?: string;
      badge_slug?: string;
      confidence?: string;
    }>;
    highlight_reel_worthy: boolean;
    top_10_play_candidate: boolean;
  };
  storytelling: {
    story_arc: string;
  };
  commentary: {
    broadcast_hook?: string;
    espn?: string;
    hype?: string;
    coach?: string;
  };
  daas_signals: {
    highlight_category: string;
    clip_summary_one_sentence: string;
    search_tags?: string[];
    content_use_cases?: string[];
    estimated_dupr_range?: string;
  };
}

// Multi-angle group ID for the fusion demo
const MULTI_ANGLE_GROUP = "TQWIPyvoX3B3";

export const CLIPS_DATA: ClipAnalysis[] = [
  {
    _source_url: "https://cdn.courtana.com/files/production/u/demo/clip-001.mp4",
    _highlight_meta: { id: "clip-001", name: "Backhand Flick Winner", type: "standard", group_id: MULTI_ANGLE_GROUP },
    analyzed_at: "2026-03-15T14:22:00Z",
    model_used: "gemini-2.5-pro",
    clip_meta: { duration_seconds: 18, clip_quality_score: 8, viral_potential_score: 7, watchability_score: 9, cinematic_score: 7 },
    players_detected: [
      { approximate_position: "right kitchen line", side: "near", dominance_in_clip: "primary", estimated_skill_level: "advanced", energy_level: "high", handedness: "right", height_estimate: "5'10\"", movement_style: "aggressive-reactive", apparel_summary: "Black JOOLA performance shirt, white shorts, SKECHERS court shoes" },
      { approximate_position: "left baseline", side: "far", dominance_in_clip: "secondary", estimated_skill_level: "intermediate", energy_level: "moderate", handedness: "left", height_estimate: "6'0\"", movement_style: "steady-defensive", apparel_summary: "Gray Nike shirt, dark shorts, ASICS shoes" },
    ],
    shot_analysis: {
      shots: [
        { shot_type: "dink", player_position: "kitchen", quality_score: 7, difficulty_score: 5, outcome: "neutral", wow_factor: 3, timestamp_approximate_seconds: 2 },
        { shot_type: "drive", player_position: "transition", quality_score: 9, difficulty_score: 8, outcome: "winner", wow_factor: 9, timestamp_approximate_seconds: 6 },
        { shot_type: "speed_up", player_position: "kitchen", quality_score: 8, difficulty_score: 7, outcome: "pressure", wow_factor: 7, timestamp_approximate_seconds: 10 },
        { shot_type: "volley", player_position: "kitchen", quality_score: 9, difficulty_score: 9, outcome: "winner", wow_factor: 10, timestamp_approximate_seconds: 14 },
      ],
      dominant_shot_type: "drive",
      total_shots_estimated: 12,
      rally_length_estimated: 14,
    },
    skill_indicators: { court_coverage_rating: 7, kitchen_mastery_rating: 8, power_game_rating: 8, touch_and_feel_rating: 7, athleticism_rating: 8, creativity_rating: 6, court_iq_rating: 7, consistency_rating: 7 },
    brand_detection: {
      brands: [
        { brand_name: "JOOLA", category: "apparel", confidence: "high", player_side: "near", visibility_quality: "clear logo", estimated_visible_seconds: 12, color_scheme_noted: "black/gold" },
        { brand_name: "SKECHERS", category: "shoes", confidence: "medium", player_side: "near", visibility_quality: "partial", estimated_visible_seconds: 6, color_scheme_noted: "white/blue" },
        { brand_name: "LIFE TIME", category: "sponsor_banner", confidence: "high", player_side: "background", visibility_quality: "banner visible", estimated_visible_seconds: 18, color_scheme_noted: "green/white" },
      ],
      total_brands_detected: 3,
      sponsorship_whitespace: ["paddle", "hat", "sunglasses", "bag", "water/beverage"],
    },
    badge_intelligence: { predicted_badges: [{ badge_name: "Kitchen Assassin", badge_slug: "kitchen_assassin", confidence: "high" }, { badge_name: "Power Player", badge_slug: "power_player", confidence: "medium" }], highlight_reel_worthy: true, top_10_play_candidate: true },
    storytelling: { story_arc: "athletic_highlight" },
    commentary: { broadcast_hook: "Watch this backhand flick — pure wrist speed!", espn: "A clinic in transition game. The near-side player reads the approach perfectly and uncorks a backhand winner.", hype: "NO WAY! That flick just broke the sound barrier! 🔥", coach: "Notice the split-step timing — they read the drive early and positioned for the counter." },
    daas_signals: { highlight_category: "Top Play", clip_summary_one_sentence: "Advanced player executes a devastating backhand flick winner from the kitchen line after a 14-shot rally.", search_tags: ["backhand", "winner", "kitchen", "rally", "advanced"], content_use_cases: ["social media highlight", "brand showcase", "coaching material"], estimated_dupr_range: "4.5-5.0" },
  },
  {
    _source_url: "https://cdn.courtana.com/files/production/u/demo/clip-002.mp4",
    _highlight_meta: { id: "clip-002", name: "45-Shot Grind Rally", type: "standard", group_id: MULTI_ANGLE_GROUP },
    analyzed_at: "2026-03-15T14:30:00Z",
    model_used: "gemini-2.5-pro",
    clip_meta: { duration_seconds: 42, clip_quality_score: 7, viral_potential_score: 8, watchability_score: 8, cinematic_score: 6 },
    players_detected: [
      { approximate_position: "baseline", side: "near", dominance_in_clip: "primary", estimated_skill_level: "advanced", energy_level: "very high", handedness: "right", height_estimate: "5'8\"", movement_style: "scrambling-athletic", apparel_summary: "White CRBN shirt, black shorts, JOOLA shoes" },
      { approximate_position: "kitchen", side: "far", dominance_in_clip: "secondary", estimated_skill_level: "advanced", energy_level: "high", handedness: "right", height_estimate: "5'11\"", movement_style: "calculated-patient", apparel_summary: "Navy blue shirt, gray shorts" },
    ],
    shot_analysis: {
      shots: [
        { shot_type: "dink", player_position: "kitchen", quality_score: 7, difficulty_score: 4, outcome: "neutral", wow_factor: 3, timestamp_approximate_seconds: 3 },
        { shot_type: "dink", player_position: "kitchen", quality_score: 8, difficulty_score: 5, outcome: "neutral", wow_factor: 4, timestamp_approximate_seconds: 8 },
        { shot_type: "lob", player_position: "kitchen", quality_score: 6, difficulty_score: 6, outcome: "reset", wow_factor: 5, timestamp_approximate_seconds: 15 },
        { shot_type: "drive", player_position: "baseline", quality_score: 8, difficulty_score: 7, outcome: "pressure", wow_factor: 7, timestamp_approximate_seconds: 22 },
        { shot_type: "drop", player_position: "transition", quality_score: 9, difficulty_score: 8, outcome: "winner", wow_factor: 8, timestamp_approximate_seconds: 35 },
      ],
      dominant_shot_type: "dink",
      total_shots_estimated: 45,
      rally_length_estimated: 45,
    },
    skill_indicators: { court_coverage_rating: 9, kitchen_mastery_rating: 8, power_game_rating: 6, touch_and_feel_rating: 8, athleticism_rating: 9, creativity_rating: 5, court_iq_rating: 8, consistency_rating: 9 },
    brand_detection: {
      brands: [
        { brand_name: "CRBN", category: "apparel", confidence: "high", player_side: "near", visibility_quality: "clear logo", estimated_visible_seconds: 30, color_scheme_noted: "white/black" },
        { brand_name: "JOOLA", category: "shoes", confidence: "medium", player_side: "near", visibility_quality: "partial", estimated_visible_seconds: 15, color_scheme_noted: "black" },
        { brand_name: "LIFE TIME", category: "sponsor_banner", confidence: "high", player_side: "background", visibility_quality: "banner visible", estimated_visible_seconds: 42, color_scheme_noted: "green/white" },
      ],
      total_brands_detected: 3,
      sponsorship_whitespace: ["paddle", "hat", "sunglasses", "wristband", "water/beverage"],
    },
    badge_intelligence: { predicted_badges: [{ badge_name: "Iron Wall", badge_slug: "iron_wall", confidence: "high" }, { badge_name: "Marathon Man", badge_slug: "marathon_man", confidence: "high" }], highlight_reel_worthy: true, top_10_play_candidate: false },
    storytelling: { story_arc: "grind_rally" },
    commentary: { broadcast_hook: "45 shots! Neither player wants to blink first.", espn: "An absolute war of attrition. Both players showing elite-level patience before the near-side player finds the drop shot winner.", hype: "ARE YOU KIDDING ME?! 45 shots and THAT'S how it ends?! 💀", coach: "The patience here is remarkable. Notice how the near-side player keeps the ball deep until they find the opening." },
    daas_signals: { highlight_category: "Rally of the Day", clip_summary_one_sentence: "Epic 45-shot rally ends with a perfectly placed drop shot winner, showcasing elite endurance and patience.", search_tags: ["rally", "endurance", "drop shot", "patience", "grind"], content_use_cases: ["viral social content", "endurance showcase", "brand exposure"], estimated_dupr_range: "4.5-5.0" },
  },
  {
    _source_url: "https://cdn.courtana.com/files/production/u/demo/clip-003.mp4",
    _highlight_meta: { id: "clip-003", name: "Erne Around the Post", type: "standard", group_id: MULTI_ANGLE_GROUP },
    analyzed_at: "2026-03-15T14:38:00Z",
    model_used: "gemini-2.5-pro",
    clip_meta: { duration_seconds: 12, clip_quality_score: 9, viral_potential_score: 9, watchability_score: 10, cinematic_score: 8 },
    players_detected: [
      { approximate_position: "sideline", side: "near", dominance_in_clip: "primary", estimated_skill_level: "elite", energy_level: "explosive", handedness: "right", height_estimate: "6'1\"", movement_style: "explosive-creative", apparel_summary: "JOOLA Hyperion shirt, black shorts, JOOLA shoes" },
    ],
    shot_analysis: {
      shots: [
        { shot_type: "dink", player_position: "kitchen", quality_score: 7, difficulty_score: 4, outcome: "setup", wow_factor: 3, timestamp_approximate_seconds: 2 },
        { shot_type: "erne", player_position: "sideline", quality_score: 10, difficulty_score: 10, outcome: "winner", wow_factor: 10, timestamp_approximate_seconds: 8 },
      ],
      dominant_shot_type: "erne",
      total_shots_estimated: 6,
      rally_length_estimated: 6,
    },
    skill_indicators: { court_coverage_rating: 6, kitchen_mastery_rating: 9, power_game_rating: 7, touch_and_feel_rating: 9, athleticism_rating: 9, creativity_rating: 10, court_iq_rating: 8, consistency_rating: 5 },
    brand_detection: {
      brands: [
        { brand_name: "JOOLA", category: "apparel", confidence: "high", player_side: "near", visibility_quality: "clear branding", estimated_visible_seconds: 10, color_scheme_noted: "black/gold" },
        { brand_name: "JOOLA", category: "shoes", confidence: "high", player_side: "near", visibility_quality: "clear", estimated_visible_seconds: 8, color_scheme_noted: "black" },
        { brand_name: "JOOLA", category: "paddle", confidence: "high", player_side: "near", visibility_quality: "clear — Hyperion CFS 16", estimated_visible_seconds: 5, color_scheme_noted: "gold/black" },
      ],
      total_brands_detected: 1,
      sponsorship_whitespace: ["hat", "sunglasses", "bag", "wristband", "water/beverage", "court surface"],
    },
    badge_intelligence: { predicted_badges: [{ badge_name: "Erne Master", badge_slug: "erne_master", confidence: "high" }, { badge_name: "Show Stopper", badge_slug: "show_stopper", confidence: "high" }], highlight_reel_worthy: true, top_10_play_candidate: true },
    storytelling: { story_arc: "dominant" },
    commentary: { broadcast_hook: "ERNE! Around the post and the crowd goes wild!", espn: "That is elite-level creativity. The timing on the erne is immaculate — sets it up with three controlled dinks then explodes around the post.", hype: "WHAT DID I JUST WITNESS?! 🤯🤯🤯 AROUND THE POST ERNE!", coach: "Perfect setup sequence. Watch the foot positioning — they're already loading for the erne two shots before execution." },
    daas_signals: { highlight_category: "Top Play", clip_summary_one_sentence: "Elite player executes a picture-perfect erne around the post for an unreturnable winner.", search_tags: ["erne", "around the post", "elite", "creative", "winner"], content_use_cases: ["viral highlight", "skills showcase", "brand hero content"], estimated_dupr_range: "5.0+" },
  },
  {
    _source_url: "https://cdn.courtana.com/files/production/u/demo/clip-004.mp4",
    _highlight_meta: { id: "clip-004", name: "Teaching Moment — Third Shot Drop", type: "standard", group_id: MULTI_ANGLE_GROUP },
    analyzed_at: "2026-03-15T14:45:00Z",
    model_used: "gemini-2.5-pro",
    clip_meta: { duration_seconds: 22, clip_quality_score: 7, viral_potential_score: 4, watchability_score: 7, cinematic_score: 6 },
    players_detected: [
      { approximate_position: "baseline", side: "near", dominance_in_clip: "primary", estimated_skill_level: "intermediate", energy_level: "moderate", handedness: "right", height_estimate: "5'9\"", movement_style: "developing-mechanical", apparel_summary: "Red shirt, khaki shorts, generic court shoes" },
      { approximate_position: "kitchen", side: "far", dominance_in_clip: "secondary", estimated_skill_level: "advanced", energy_level: "relaxed", handedness: "right", height_estimate: "5'10\"", movement_style: "smooth-efficient", apparel_summary: "SELKIRK polo, dark shorts" },
    ],
    shot_analysis: {
      shots: [
        { shot_type: "serve", player_position: "baseline", quality_score: 6, difficulty_score: 3, outcome: "in play", wow_factor: 2, timestamp_approximate_seconds: 1 },
        { shot_type: "return", player_position: "baseline", quality_score: 7, difficulty_score: 4, outcome: "deep return", wow_factor: 3, timestamp_approximate_seconds: 3 },
        { shot_type: "drop", player_position: "baseline", quality_score: 4, difficulty_score: 7, outcome: "attackable", wow_factor: 2, timestamp_approximate_seconds: 5 },
        { shot_type: "drive", player_position: "kitchen", quality_score: 8, difficulty_score: 5, outcome: "winner", wow_factor: 5, timestamp_approximate_seconds: 7 },
      ],
      dominant_shot_type: "drop",
      total_shots_estimated: 8,
      rally_length_estimated: 8,
    },
    skill_indicators: { court_coverage_rating: 5, kitchen_mastery_rating: 4, power_game_rating: 5, touch_and_feel_rating: 4, athleticism_rating: 5, creativity_rating: 3, court_iq_rating: 5, consistency_rating: 6 },
    brand_detection: {
      brands: [
        { brand_name: "SELKIRK", category: "apparel", confidence: "medium", player_side: "far", visibility_quality: "partial logo", estimated_visible_seconds: 8, color_scheme_noted: "navy" },
        { brand_name: "LIFE TIME", category: "sponsor_banner", confidence: "high", player_side: "background", visibility_quality: "banner", estimated_visible_seconds: 22, color_scheme_noted: "green/white" },
      ],
      total_brands_detected: 2,
      sponsorship_whitespace: ["paddle", "shoes", "hat", "sunglasses", "bag", "wristband", "water/beverage"],
    },
    badge_intelligence: { predicted_badges: [{ badge_name: "Work In Progress", badge_slug: "work_in_progress", confidence: "medium" }], highlight_reel_worthy: false, top_10_play_candidate: false },
    storytelling: { story_arc: "teaching_moment" },
    commentary: { broadcast_hook: "Classic teaching moment — why the third shot drop is so important.", espn: "You can see the mechanical breakdown in the third shot drop. The paddle face is too open, giving the opponent an easy attack ball.", coach: "Key correction: the drop needs to come from the legs, not the arm. Watch the wrist — it's flipping up instead of pushing through. Fix the contact point and this player jumps a full level." },
    daas_signals: { highlight_category: "Coaching Content", clip_summary_one_sentence: "Intermediate player's third shot drop sits up for an easy put-away, illustrating common mechanical errors at the 3.5 level.", search_tags: ["third shot drop", "coaching", "intermediate", "mechanics", "improvement"], content_use_cases: ["coaching curriculum", "skill development content", "instructional series"], estimated_dupr_range: "3.0-3.5" },
  },
  {
    _source_url: "https://cdn.courtana.com/files/production/u/demo/clip-005.mp4",
    _highlight_meta: { id: "clip-005", name: "Double Dive Save", type: "standard", group_id: MULTI_ANGLE_GROUP },
    analyzed_at: "2026-03-15T14:52:00Z",
    model_used: "gemini-2.5-pro",
    clip_meta: { duration_seconds: 15, clip_quality_score: 8, viral_potential_score: 9, watchability_score: 9, cinematic_score: 9 },
    players_detected: [
      { approximate_position: "court center", side: "near", dominance_in_clip: "primary", estimated_skill_level: "advanced", energy_level: "maximum", handedness: "right", height_estimate: "5'7\"", movement_style: "explosive-diving", apparel_summary: "ADIDAS court shirt, black shorts, ADIDAS shoes" },
    ],
    shot_analysis: {
      shots: [
        { shot_type: "volley", player_position: "kitchen", quality_score: 6, difficulty_score: 9, outcome: "saved", wow_factor: 9, timestamp_approximate_seconds: 4 },
        { shot_type: "volley", player_position: "ground", quality_score: 7, difficulty_score: 10, outcome: "saved", wow_factor: 10, timestamp_approximate_seconds: 6 },
        { shot_type: "lob", player_position: "kitchen", quality_score: 5, difficulty_score: 3, outcome: "reset", wow_factor: 2, timestamp_approximate_seconds: 9 },
      ],
      dominant_shot_type: "volley",
      total_shots_estimated: 10,
      rally_length_estimated: 10,
    },
    skill_indicators: { court_coverage_rating: 10, kitchen_mastery_rating: 6, power_game_rating: 5, touch_and_feel_rating: 7, athleticism_rating: 10, creativity_rating: 7, court_iq_rating: 6, consistency_rating: 5 },
    brand_detection: {
      brands: [
        { brand_name: "ADIDAS", category: "apparel", confidence: "high", player_side: "near", visibility_quality: "clear three stripes", estimated_visible_seconds: 12, color_scheme_noted: "white/black" },
        { brand_name: "ADIDAS", category: "shoes", confidence: "high", player_side: "near", visibility_quality: "clear", estimated_visible_seconds: 10, color_scheme_noted: "white/black" },
      ],
      total_brands_detected: 1,
      sponsorship_whitespace: ["paddle", "hat", "sunglasses", "bag", "wristband", "water/beverage", "net", "court surface"],
    },
    badge_intelligence: { predicted_badges: [{ badge_name: "Dive Master", badge_slug: "dive_master", confidence: "high" }, { badge_name: "Never Give Up", badge_slug: "never_give_up", confidence: "high" }], highlight_reel_worthy: true, top_10_play_candidate: true },
    storytelling: { story_arc: "athletic_highlight" },
    commentary: { broadcast_hook: "TWO dive saves in a row! This player wants it MORE.", espn: "Incredible athleticism on display. Two consecutive diving volleys — the second one from the ground — to keep this rally alive.", hype: "THIS PERSON IS NOT HUMAN! TWO DIVES! TWO SAVES! 🏊‍♂️💪", coach: "The hustle is off the charts. That said, better positioning would avoid needing the dives. Let's work on anticipation." },
    daas_signals: { highlight_category: "Hustle Play", clip_summary_one_sentence: "Player makes two consecutive diving saves to keep a rally alive, showcasing extraordinary athleticism and determination.", search_tags: ["diving save", "hustle", "athleticism", "determination", "wow"], content_use_cases: ["viral social content", "brand athleticism showcase", "health/fitness marketing"], estimated_dupr_range: "4.0-4.5" },
  },
  // Clips 6-10: Additional variety
  {
    _source_url: "https://cdn.courtana.com/files/production/u/demo/clip-006.mp4",
    _highlight_meta: { id: "clip-006", name: "Serve Ace — 62 MPH", type: "standard", group_id: "group-002" },
    analyzed_at: "2026-03-16T10:15:00Z",
    model_used: "gemini-2.5-pro",
    clip_meta: { duration_seconds: 8, clip_quality_score: 7, viral_potential_score: 6, watchability_score: 7, cinematic_score: 5 },
    players_detected: [
      { approximate_position: "baseline", side: "near", dominance_in_clip: "primary", estimated_skill_level: "advanced", energy_level: "high", handedness: "right", height_estimate: "6'2\"", movement_style: "powerful-deliberate", apparel_summary: "Black ONIX shirt, black shorts, Nike shoes" },
    ],
    shot_analysis: {
      shots: [
        { shot_type: "serve", player_position: "baseline", quality_score: 9, difficulty_score: 7, outcome: "ace", wow_factor: 8, timestamp_approximate_seconds: 3 },
      ],
      dominant_shot_type: "serve",
      total_shots_estimated: 1,
      rally_length_estimated: 1,
    },
    skill_indicators: { court_coverage_rating: 5, kitchen_mastery_rating: 5, power_game_rating: 9, touch_and_feel_rating: 4, athleticism_rating: 7, creativity_rating: 4, court_iq_rating: 6, consistency_rating: 7 },
    brand_detection: {
      brands: [
        { brand_name: "ONIX", category: "apparel", confidence: "medium", player_side: "near", visibility_quality: "logo visible", estimated_visible_seconds: 6, color_scheme_noted: "black/green" },
      ],
      total_brands_detected: 1,
      sponsorship_whitespace: ["paddle", "shoes", "hat", "sunglasses", "bag", "wristband", "water/beverage", "net", "court surface"],
    },
    badge_intelligence: { predicted_badges: [{ badge_name: "Cannon Serve", badge_slug: "cannon_serve", confidence: "high" }], highlight_reel_worthy: true, top_10_play_candidate: false },
    storytelling: { story_arc: "dominant" },
    commentary: { broadcast_hook: "62 miles per hour! That serve is unreturnable.", espn: "Pure power off the paddle face. The receiver barely had time to react.", coach: "Great serve placement — deep corner with pace. The toss is consistent, which is key." },
    daas_signals: { highlight_category: "Power Play", clip_summary_one_sentence: "62 MPH serve ace catches the opponent flat-footed, demonstrating elite serve velocity.", search_tags: ["serve", "ace", "power", "speed", "62mph"], content_use_cases: ["power metrics showcase", "equipment testing content"], estimated_dupr_range: "4.5-5.0" },
  },
  {
    _source_url: "https://cdn.courtana.com/files/production/u/demo/clip-007.mp4",
    _highlight_meta: { id: "clip-007", name: "Kitchen Dink Exchange", type: "standard", group_id: "group-002" },
    analyzed_at: "2026-03-16T10:22:00Z",
    model_used: "gemini-2.5-pro",
    clip_meta: { duration_seconds: 28, clip_quality_score: 7, viral_potential_score: 5, watchability_score: 8, cinematic_score: 7 },
    players_detected: [
      { approximate_position: "kitchen", side: "near", dominance_in_clip: "primary", estimated_skill_level: "advanced", energy_level: "controlled", handedness: "left", height_estimate: "5'6\"", movement_style: "precise-methodical", apparel_summary: "White polo, tan shorts, New Balance shoes" },
      { approximate_position: "kitchen", side: "far", dominance_in_clip: "secondary", estimated_skill_level: "advanced", energy_level: "controlled", handedness: "right", height_estimate: "5'9\"", movement_style: "patient-tactical", apparel_summary: "Blue Under Armour shirt, navy shorts" },
    ],
    shot_analysis: {
      shots: [
        { shot_type: "dink", player_position: "kitchen", quality_score: 8, difficulty_score: 6, outcome: "neutral", wow_factor: 4, timestamp_approximate_seconds: 3 },
        { shot_type: "dink", player_position: "kitchen", quality_score: 9, difficulty_score: 7, outcome: "pressure", wow_factor: 6, timestamp_approximate_seconds: 10 },
        { shot_type: "dink", player_position: "kitchen", quality_score: 8, difficulty_score: 6, outcome: "neutral", wow_factor: 5, timestamp_approximate_seconds: 16 },
        { shot_type: "speed_up", player_position: "kitchen", quality_score: 8, difficulty_score: 8, outcome: "winner", wow_factor: 7, timestamp_approximate_seconds: 22 },
      ],
      dominant_shot_type: "dink",
      total_shots_estimated: 20,
      rally_length_estimated: 20,
    },
    skill_indicators: { court_coverage_rating: 6, kitchen_mastery_rating: 9, power_game_rating: 4, touch_and_feel_rating: 9, athleticism_rating: 5, creativity_rating: 7, court_iq_rating: 9, consistency_rating: 9 },
    brand_detection: {
      brands: [
        { brand_name: "Under Armour", category: "apparel", confidence: "medium", player_side: "far", visibility_quality: "partial logo", estimated_visible_seconds: 10, color_scheme_noted: "blue" },
        { brand_name: "LIFE TIME", category: "sponsor_banner", confidence: "high", player_side: "background", visibility_quality: "banner", estimated_visible_seconds: 28, color_scheme_noted: "green/white" },
      ],
      total_brands_detected: 2,
      sponsorship_whitespace: ["paddle", "shoes", "hat", "sunglasses", "bag", "wristband", "water/beverage"],
    },
    badge_intelligence: { predicted_badges: [{ badge_name: "Dink Master", badge_slug: "dink_master", confidence: "high" }, { badge_name: "Patient Predator", badge_slug: "patient_predator", confidence: "medium" }], highlight_reel_worthy: false, top_10_play_candidate: false },
    storytelling: { story_arc: "grind_rally" },
    commentary: { broadcast_hook: "A chess match at the kitchen line. Who blinks first?", espn: "Beautiful patience from both players. Twenty controlled dinks before the near-side player finds the speed-up opportunity.", coach: "Watch the paddle angle changes — subtle adjustments create pressure without overcommitting." },
    daas_signals: { highlight_category: "Tactical Play", clip_summary_one_sentence: "Two advanced players exchange 20 precise dinks at the kitchen before a well-timed speed-up ends the point.", search_tags: ["dink", "kitchen", "patience", "tactical", "speed-up"], content_use_cases: ["coaching content", "tactical analysis"], estimated_dupr_range: "4.5-5.0" },
  },
  {
    _source_url: "https://cdn.courtana.com/files/production/u/demo/clip-008.mp4",
    _highlight_meta: { id: "clip-008", name: "Beginner Comedy of Errors", type: "standard", group_id: "group-003" },
    analyzed_at: "2026-03-16T10:30:00Z",
    model_used: "gemini-2.5-pro",
    clip_meta: { duration_seconds: 16, clip_quality_score: 5, viral_potential_score: 7, watchability_score: 6, cinematic_score: 4 },
    players_detected: [
      { approximate_position: "mid-court", side: "near", dominance_in_clip: "primary", estimated_skill_level: "beginner", energy_level: "enthusiastic", handedness: "right", height_estimate: "5'5\"", movement_style: "choppy-learning", apparel_summary: "Cotton t-shirt, gym shorts, running shoes" },
      { approximate_position: "mid-court", side: "far", dominance_in_clip: "secondary", estimated_skill_level: "beginner", energy_level: "laughing", handedness: "right", height_estimate: "5'8\"", movement_style: "hesitant-new", apparel_summary: "Tank top, yoga pants, cross-trainers" },
    ],
    shot_analysis: {
      shots: [
        { shot_type: "serve", player_position: "baseline", quality_score: 3, difficulty_score: 2, outcome: "fault", wow_factor: 1, timestamp_approximate_seconds: 2 },
        { shot_type: "serve", player_position: "baseline", quality_score: 4, difficulty_score: 2, outcome: "in play", wow_factor: 2, timestamp_approximate_seconds: 5 },
        { shot_type: "return", player_position: "mid-court", quality_score: 3, difficulty_score: 3, outcome: "net", wow_factor: 2, timestamp_approximate_seconds: 7 },
      ],
      dominant_shot_type: "serve",
      total_shots_estimated: 4,
      rally_length_estimated: 2,
    },
    skill_indicators: { court_coverage_rating: 2, kitchen_mastery_rating: 1, power_game_rating: 2, touch_and_feel_rating: 2, athleticism_rating: 3, creativity_rating: 2, court_iq_rating: 1, consistency_rating: 2 },
    brand_detection: {
      brands: [
        { brand_name: "LIFE TIME", category: "sponsor_banner", confidence: "high", player_side: "background", visibility_quality: "banner", estimated_visible_seconds: 16, color_scheme_noted: "green/white" },
      ],
      total_brands_detected: 1,
      sponsorship_whitespace: ["paddle", "shoes", "apparel", "hat", "sunglasses", "bag", "wristband", "water/beverage"],
    },
    badge_intelligence: { predicted_badges: [{ badge_name: "First Timer", badge_slug: "first_timer", confidence: "high" }], highlight_reel_worthy: false, top_10_play_candidate: false },
    storytelling: { story_arc: "pure_fun" },
    commentary: { broadcast_hook: "Everyone starts somewhere! The joy of discovery.", espn: "While the skill level is early, the enthusiasm is palpable. This is the growth market that every brand wants to reach.", coach: "Start with the grip — continental for serves and volleys. Both players are using a tennis forehand grip, which limits dink control." },
    daas_signals: { highlight_category: "Growth Market", clip_summary_one_sentence: "Two enthusiastic beginners discover the game, representing the fastest-growing demographic in pickleball.", search_tags: ["beginner", "fun", "new player", "growth market", "learning"], content_use_cases: ["market sizing evidence", "beginner equipment marketing", "facility programming"], estimated_dupr_range: "2.0-2.5" },
  },
  {
    _source_url: "https://cdn.courtana.com/files/production/u/demo/clip-009.mp4",
    _highlight_meta: { id: "clip-009", name: "Doubles Championship Point", type: "standard", group_id: "group-003" },
    analyzed_at: "2026-03-16T10:38:00Z",
    model_used: "gemini-2.5-pro",
    clip_meta: { duration_seconds: 35, clip_quality_score: 9, viral_potential_score: 8, watchability_score: 9, cinematic_score: 8 },
    players_detected: [
      { approximate_position: "kitchen", side: "near", dominance_in_clip: "primary", estimated_skill_level: "elite", energy_level: "intense-focused", handedness: "right", height_estimate: "5'11\"", movement_style: "fluid-aggressive", apparel_summary: "JOOLA competition kit, headband, JOOLA shoes" },
      { approximate_position: "transition", side: "near", dominance_in_clip: "secondary", estimated_skill_level: "advanced", energy_level: "high", handedness: "left", height_estimate: "5'9\"", movement_style: "supportive-smart", apparel_summary: "JOOLA team shirt, dark shorts" },
      { approximate_position: "kitchen", side: "far", dominance_in_clip: "background", estimated_skill_level: "advanced", energy_level: "defensive", handedness: "right", height_estimate: "6'0\"", movement_style: "reactive-scrambling", apparel_summary: "CRBN shirt, dark shorts, Nike shoes" },
      { approximate_position: "baseline", side: "far", dominance_in_clip: "background", estimated_skill_level: "advanced", energy_level: "moderate", handedness: "right", height_estimate: "5'10\"", movement_style: "steady", apparel_summary: "White shirt, gray shorts" },
    ],
    shot_analysis: {
      shots: [
        { shot_type: "serve", player_position: "baseline", quality_score: 8, difficulty_score: 5, outcome: "deep serve", wow_factor: 4, timestamp_approximate_seconds: 2 },
        { shot_type: "return", player_position: "baseline", quality_score: 7, difficulty_score: 4, outcome: "in play", wow_factor: 3, timestamp_approximate_seconds: 4 },
        { shot_type: "drop", player_position: "transition", quality_score: 8, difficulty_score: 7, outcome: "effective", wow_factor: 5, timestamp_approximate_seconds: 6 },
        { shot_type: "dink", player_position: "kitchen", quality_score: 8, difficulty_score: 6, outcome: "pressure", wow_factor: 5, timestamp_approximate_seconds: 12 },
        { shot_type: "speed_up", player_position: "kitchen", quality_score: 9, difficulty_score: 8, outcome: "pressure", wow_factor: 7, timestamp_approximate_seconds: 20 },
        { shot_type: "volley", player_position: "kitchen", quality_score: 10, difficulty_score: 9, outcome: "winner", wow_factor: 9, timestamp_approximate_seconds: 28 },
      ],
      dominant_shot_type: "dink",
      total_shots_estimated: 22,
      rally_length_estimated: 22,
    },
    skill_indicators: { court_coverage_rating: 8, kitchen_mastery_rating: 9, power_game_rating: 8, touch_and_feel_rating: 9, athleticism_rating: 8, creativity_rating: 7, court_iq_rating: 9, consistency_rating: 8 },
    brand_detection: {
      brands: [
        { brand_name: "JOOLA", category: "apparel", confidence: "high", player_side: "near", visibility_quality: "full kit branding", estimated_visible_seconds: 30, color_scheme_noted: "black/gold" },
        { brand_name: "JOOLA", category: "shoes", confidence: "high", player_side: "near", visibility_quality: "clear", estimated_visible_seconds: 20, color_scheme_noted: "black" },
        { brand_name: "CRBN", category: "apparel", confidence: "medium", player_side: "far", visibility_quality: "partial", estimated_visible_seconds: 12, color_scheme_noted: "white/black" },
        { brand_name: "LIFE TIME", category: "sponsor_banner", confidence: "high", player_side: "background", visibility_quality: "prominent", estimated_visible_seconds: 35, color_scheme_noted: "green/white" },
      ],
      total_brands_detected: 3,
      sponsorship_whitespace: ["hat", "sunglasses", "bag", "wristband", "water/beverage"],
    },
    badge_intelligence: { predicted_badges: [{ badge_name: "Championship DNA", badge_slug: "championship_dna", confidence: "high" }, { badge_name: "Team Leader", badge_slug: "team_leader", confidence: "high" }], highlight_reel_worthy: true, top_10_play_candidate: true },
    storytelling: { story_arc: "comeback" },
    commentary: { broadcast_hook: "Championship point! Can they close it out?", espn: "What a way to seal it! The near-side team constructs the point beautifully — patient at the kitchen before finding the decisive volley winner.", hype: "GAME OVER! CHAMPIONS! THE CROWD IS ON THEIR FEET! 🏆🔥", coach: "Perfect doubles execution. The partner creates width with their positioning, opening the angle for the finishing volley." },
    daas_signals: { highlight_category: "Championship Moment", clip_summary_one_sentence: "Team closes out the match with a beautifully constructed 22-shot rally ending in a decisive volley winner.", search_tags: ["championship", "doubles", "teamwork", "volley", "winner", "elite"], content_use_cases: ["championship highlight reel", "brand hero content", "doubles strategy content"], estimated_dupr_range: "5.0+" },
  },
  {
    _source_url: "https://cdn.courtana.com/files/production/u/demo/clip-010.mp4",
    _highlight_meta: { id: "clip-010", name: "Recovery Cave Timeout", type: "standard", group_id: "group-003" },
    analyzed_at: "2026-03-16T10:45:00Z",
    model_used: "gemini-2.5-pro",
    clip_meta: { duration_seconds: 20, clip_quality_score: 6, viral_potential_score: 3, watchability_score: 5, cinematic_score: 5 },
    players_detected: [
      { approximate_position: "sideline bench", side: "near", dominance_in_clip: "primary", estimated_skill_level: "advanced", energy_level: "fatigued-recovering", handedness: "right", height_estimate: "5'10\"", movement_style: "resting", apparel_summary: "Sweat-soaked JOOLA shirt, knee brace on right leg, compression sleeve on left arm" },
    ],
    shot_analysis: { shots: [], dominant_shot_type: "none", total_shots_estimated: 0, rally_length_estimated: 0 },
    skill_indicators: { court_coverage_rating: 0, kitchen_mastery_rating: 0, power_game_rating: 0, touch_and_feel_rating: 0, athleticism_rating: 0, creativity_rating: 0, court_iq_rating: 0, consistency_rating: 0 },
    brand_detection: {
      brands: [
        { brand_name: "JOOLA", category: "apparel", confidence: "high", player_side: "near", visibility_quality: "clear", estimated_visible_seconds: 18, color_scheme_noted: "black/gold" },
        { brand_name: "Recovery Cave", category: "sponsor_banner", confidence: "high", player_side: "background", visibility_quality: "large banner", estimated_visible_seconds: 20, color_scheme_noted: "blue/white" },
        { brand_name: "The Underground", category: "sponsor_banner", confidence: "medium", player_side: "background", visibility_quality: "visible signage", estimated_visible_seconds: 15, color_scheme_noted: "dark/neon" },
      ],
      total_brands_detected: 3,
      sponsorship_whitespace: ["water/beverage", "recovery drink", "ice/cooling", "towel"],
    },
    badge_intelligence: { predicted_badges: [{ badge_name: "Battle Worn", badge_slug: "battle_worn", confidence: "medium" }], highlight_reel_worthy: false, top_10_play_candidate: false },
    storytelling: { story_arc: "recovery" },
    commentary: { broadcast_hook: "Even warriors need recovery time.", espn: "Between-game recovery is as important as the play itself. Note the knee brace and compression sleeve — this player is managing their body.", coach: "Recovery protocols matter. Ice that knee between games. The compression sleeve on the arm suggests some elbow stress — monitor for repetitive strain." },
    daas_signals: { highlight_category: "Health Signal", clip_summary_one_sentence: "Player rests on sideline with visible knee brace and compression sleeve, providing health and recovery data signals.", search_tags: ["recovery", "injury", "knee brace", "fatigue", "health data"], content_use_cases: ["health insurer intelligence", "recovery product marketing", "facility wellness programming"], estimated_dupr_range: "4.0-4.5" },
  },
  // Clips 11-15: Rounding out the dataset
  {
    _source_url: "https://cdn.courtana.com/files/production/u/demo/clip-011.mp4",
    _highlight_meta: { id: "clip-011", name: "Lob Defense Masterclass", type: "standard", group_id: "group-004" },
    analyzed_at: "2026-03-17T09:10:00Z",
    model_used: "gemini-2.5-pro",
    clip_meta: { duration_seconds: 25, clip_quality_score: 7, viral_potential_score: 5, watchability_score: 7, cinematic_score: 6 },
    players_detected: [
      { approximate_position: "baseline", side: "near", dominance_in_clip: "primary", estimated_skill_level: "advanced", energy_level: "high", handedness: "right", height_estimate: "5'10\"", movement_style: "defensive-athletic", apparel_summary: "SELKIRK shirt, dark shorts, ASICS shoes" },
    ],
    shot_analysis: {
      shots: [
        { shot_type: "lob", player_position: "kitchen", quality_score: 7, difficulty_score: 6, outcome: "defensive reset", wow_factor: 5, timestamp_approximate_seconds: 5 },
        { shot_type: "overhead", player_position: "mid-court", quality_score: 6, difficulty_score: 7, outcome: "returned", wow_factor: 4, timestamp_approximate_seconds: 10 },
        { shot_type: "lob", player_position: "baseline", quality_score: 8, difficulty_score: 7, outcome: "effective", wow_factor: 6, timestamp_approximate_seconds: 16 },
      ],
      dominant_shot_type: "lob",
      total_shots_estimated: 14,
      rally_length_estimated: 14,
    },
    skill_indicators: { court_coverage_rating: 8, kitchen_mastery_rating: 5, power_game_rating: 5, touch_and_feel_rating: 7, athleticism_rating: 7, creativity_rating: 6, court_iq_rating: 7, consistency_rating: 7 },
    brand_detection: {
      brands: [
        { brand_name: "SELKIRK", category: "apparel", confidence: "high", player_side: "near", visibility_quality: "clear logo", estimated_visible_seconds: 18, color_scheme_noted: "navy/white" },
      ],
      total_brands_detected: 1,
      sponsorship_whitespace: ["paddle", "shoes", "hat", "bag", "water/beverage", "net", "court surface"],
    },
    badge_intelligence: { predicted_badges: [{ badge_name: "Lob Artist", badge_slug: "lob_artist", confidence: "medium" }], highlight_reel_worthy: false, top_10_play_candidate: false },
    storytelling: { story_arc: "teaching_moment" },
    commentary: { coach: "Excellent use of the defensive lob to reset position. Notice the depth — deep lobs buy time, short lobs get punished." },
    daas_signals: { highlight_category: "Coaching Content", clip_summary_one_sentence: "Advanced player demonstrates effective defensive lob technique to reset from a pressure situation.", search_tags: ["lob", "defense", "reset", "coaching", "advanced"], content_use_cases: ["coaching curriculum", "defensive strategy content"], estimated_dupr_range: "4.0-4.5" },
  },
  {
    _source_url: "https://cdn.courtana.com/files/production/u/demo/clip-012.mp4",
    _highlight_meta: { id: "clip-012", name: "Mixed Doubles Communication", type: "standard", group_id: "group-004" },
    analyzed_at: "2026-03-17T09:18:00Z",
    model_used: "gemini-2.5-pro",
    clip_meta: { duration_seconds: 30, clip_quality_score: 7, viral_potential_score: 4, watchability_score: 7, cinematic_score: 6 },
    players_detected: [
      { approximate_position: "kitchen", side: "near", dominance_in_clip: "primary", estimated_skill_level: "intermediate", energy_level: "communicative", handedness: "right", height_estimate: "5'4\"", movement_style: "agile-quick", apparel_summary: "Pink athletic top, white skirt, SKECHERS shoes" },
      { approximate_position: "transition", side: "near", dominance_in_clip: "secondary", estimated_skill_level: "intermediate", energy_level: "supportive", handedness: "right", height_estimate: "6'0\"", movement_style: "positioning-focused", apparel_summary: "Gray shirt, black shorts, Nike shoes" },
    ],
    shot_analysis: {
      shots: [
        { shot_type: "dink", player_position: "kitchen", quality_score: 7, difficulty_score: 5, outcome: "neutral", wow_factor: 3, timestamp_approximate_seconds: 4 },
        { shot_type: "drive", player_position: "transition", quality_score: 6, difficulty_score: 5, outcome: "returned", wow_factor: 3, timestamp_approximate_seconds: 12 },
        { shot_type: "volley", player_position: "kitchen", quality_score: 7, difficulty_score: 6, outcome: "winner", wow_factor: 5, timestamp_approximate_seconds: 22 },
      ],
      dominant_shot_type: "dink",
      total_shots_estimated: 16,
      rally_length_estimated: 16,
    },
    skill_indicators: { court_coverage_rating: 6, kitchen_mastery_rating: 7, power_game_rating: 4, touch_and_feel_rating: 7, athleticism_rating: 5, creativity_rating: 5, court_iq_rating: 7, consistency_rating: 7 },
    brand_detection: {
      brands: [
        { brand_name: "SKECHERS", category: "shoes", confidence: "high", player_side: "near", visibility_quality: "clear S logo", estimated_visible_seconds: 15, color_scheme_noted: "white/pink" },
        { brand_name: "LIFE TIME", category: "sponsor_banner", confidence: "high", player_side: "background", visibility_quality: "banner", estimated_visible_seconds: 30, color_scheme_noted: "green/white" },
      ],
      total_brands_detected: 2,
      sponsorship_whitespace: ["paddle", "apparel", "hat", "sunglasses", "bag", "wristband", "water/beverage"],
    },
    badge_intelligence: { predicted_badges: [{ badge_name: "Team Player", badge_slug: "team_player", confidence: "medium" }], highlight_reel_worthy: false, top_10_play_candidate: false },
    storytelling: { story_arc: "pure_fun" },
    commentary: { coach: "Good communication between partners — calling 'mine' and 'yours' consistently. The stacking strategy is solid for their skill level." },
    daas_signals: { highlight_category: "Mixed Doubles", clip_summary_one_sentence: "Mixed doubles team shows effective communication and positioning in a well-played point.", search_tags: ["mixed doubles", "communication", "teamwork", "intermediate"], content_use_cases: ["doubles coaching content", "mixed format marketing"], estimated_dupr_range: "3.5-4.0" },
  },
  {
    _source_url: "https://cdn.courtana.com/files/production/u/demo/clip-013.mp4",
    _highlight_meta: { id: "clip-013", name: "Spin Serve Controversy", type: "standard", group_id: "group-004" },
    analyzed_at: "2026-03-17T09:25:00Z",
    model_used: "gemini-2.5-pro",
    clip_meta: { duration_seconds: 14, clip_quality_score: 7, viral_potential_score: 7, watchability_score: 7, cinematic_score: 5 },
    players_detected: [
      { approximate_position: "baseline", side: "near", dominance_in_clip: "primary", estimated_skill_level: "advanced", energy_level: "competitive", handedness: "right", height_estimate: "5'11\"", movement_style: "tactical", apparel_summary: "CRBN performance shirt, black shorts" },
    ],
    shot_analysis: {
      shots: [
        { shot_type: "serve", player_position: "baseline", quality_score: 8, difficulty_score: 8, outcome: "unreturnable", wow_factor: 7, timestamp_approximate_seconds: 3 },
      ],
      dominant_shot_type: "serve",
      total_shots_estimated: 1,
      rally_length_estimated: 1,
    },
    skill_indicators: { court_coverage_rating: 5, kitchen_mastery_rating: 6, power_game_rating: 7, touch_and_feel_rating: 8, athleticism_rating: 6, creativity_rating: 8, court_iq_rating: 7, consistency_rating: 6 },
    brand_detection: {
      brands: [
        { brand_name: "CRBN", category: "apparel", confidence: "high", player_side: "near", visibility_quality: "clear", estimated_visible_seconds: 10, color_scheme_noted: "white/black" },
      ],
      total_brands_detected: 1,
      sponsorship_whitespace: ["paddle", "shoes", "hat", "sunglasses", "bag", "water/beverage"],
    },
    badge_intelligence: { predicted_badges: [{ badge_name: "Spin Doctor", badge_slug: "spin_doctor", confidence: "high" }], highlight_reel_worthy: true, top_10_play_candidate: false },
    storytelling: { story_arc: "dominant" },
    commentary: { broadcast_hook: "Is that spin serve legal? The receiver couldn't read it!", espn: "The amount of spin on that serve is extraordinary. The ball kicks hard to the left, leaving the receiver completely wrong-footed.", coach: "Legal under current rules, but barely. The toss is clean — no added spin from the release hand. The spin comes from the paddle face angle at contact." },
    daas_signals: { highlight_category: "Controversial Play", clip_summary_one_sentence: "Advanced player's heavy spin serve proves unreturnable, raising questions about serve mechanics and rules.", search_tags: ["spin serve", "controversial", "advanced", "serve technique"], content_use_cases: ["rules discussion content", "technique analysis", "social engagement bait"], estimated_dupr_range: "4.5-5.0" },
  },
  {
    _source_url: "https://cdn.courtana.com/files/production/u/demo/clip-014.mp4",
    _highlight_meta: { id: "clip-014", name: "Youth Division Showcase", type: "standard", group_id: "group-005" },
    analyzed_at: "2026-03-17T09:32:00Z",
    model_used: "gemini-2.5-pro",
    clip_meta: { duration_seconds: 20, clip_quality_score: 7, viral_potential_score: 6, watchability_score: 8, cinematic_score: 7 },
    players_detected: [
      { approximate_position: "kitchen", side: "near", dominance_in_clip: "primary", estimated_skill_level: "intermediate", energy_level: "enthusiastic", handedness: "right", height_estimate: "5'2\"", movement_style: "quick-developing", apparel_summary: "JOOLA junior shirt, athletic shorts, court shoes" },
    ],
    shot_analysis: {
      shots: [
        { shot_type: "dink", player_position: "kitchen", quality_score: 7, difficulty_score: 5, outcome: "neutral", wow_factor: 4, timestamp_approximate_seconds: 3 },
        { shot_type: "drive", player_position: "transition", quality_score: 7, difficulty_score: 6, outcome: "pressure", wow_factor: 5, timestamp_approximate_seconds: 10 },
        { shot_type: "volley", player_position: "kitchen", quality_score: 8, difficulty_score: 7, outcome: "winner", wow_factor: 7, timestamp_approximate_seconds: 16 },
      ],
      dominant_shot_type: "dink",
      total_shots_estimated: 10,
      rally_length_estimated: 10,
    },
    skill_indicators: { court_coverage_rating: 7, kitchen_mastery_rating: 6, power_game_rating: 5, touch_and_feel_rating: 7, athleticism_rating: 8, creativity_rating: 6, court_iq_rating: 6, consistency_rating: 6 },
    brand_detection: {
      brands: [
        { brand_name: "JOOLA", category: "apparel", confidence: "high", player_side: "near", visibility_quality: "clear junior branding", estimated_visible_seconds: 16, color_scheme_noted: "black/gold" },
      ],
      total_brands_detected: 1,
      sponsorship_whitespace: ["paddle", "shoes", "hat", "sunglasses", "bag", "water/beverage"],
    },
    badge_intelligence: { predicted_badges: [{ badge_name: "Rising Star", badge_slug: "rising_star", confidence: "high" }, { badge_name: "Future Pro", badge_slug: "future_pro", confidence: "medium" }], highlight_reel_worthy: true, top_10_play_candidate: false },
    storytelling: { story_arc: "athletic_highlight" },
    commentary: { broadcast_hook: "The future of pickleball is here — and it's 14 years old!", espn: "Remarkable poise for a junior player. The footwork and paddle control suggest years of development ahead.", coach: "This junior has a complete game for their age. The dink consistency is impressive — most juniors want to bang every ball." },
    daas_signals: { highlight_category: "Youth Showcase", clip_summary_one_sentence: "Junior player displays impressive fundamentals and composure in a well-constructed point.", search_tags: ["junior", "youth", "development", "rising star", "future"], content_use_cases: ["youth program marketing", "brand junior ambassador content", "development tracking"], estimated_dupr_range: "3.5-4.0" },
  },
  {
    _source_url: "https://cdn.courtana.com/files/production/u/demo/clip-015.mp4",
    _highlight_meta: { id: "clip-015", name: "Paddle Swap Mid-Rally", type: "standard", group_id: "group-005" },
    analyzed_at: "2026-03-17T09:40:00Z",
    model_used: "gemini-2.5-pro",
    clip_meta: { duration_seconds: 18, clip_quality_score: 6, viral_potential_score: 9, watchability_score: 8, cinematic_score: 5 },
    players_detected: [
      { approximate_position: "mid-court", side: "near", dominance_in_clip: "primary", estimated_skill_level: "advanced", energy_level: "chaotic", handedness: "right", height_estimate: "5'9\"", movement_style: "improvisational", apparel_summary: "Tie-dye shirt, shorts, mismatched shoes" },
    ],
    shot_analysis: {
      shots: [
        { shot_type: "volley", player_position: "kitchen", quality_score: 5, difficulty_score: 3, outcome: "paddle drop", wow_factor: 3, timestamp_approximate_seconds: 4 },
        { shot_type: "volley", player_position: "kitchen", quality_score: 4, difficulty_score: 9, outcome: "returned with wrong hand", wow_factor: 9, timestamp_approximate_seconds: 7 },
        { shot_type: "lob", player_position: "kitchen", quality_score: 3, difficulty_score: 2, outcome: "weak return", wow_factor: 2, timestamp_approximate_seconds: 12 },
      ],
      dominant_shot_type: "volley",
      total_shots_estimated: 8,
      rally_length_estimated: 8,
    },
    skill_indicators: { court_coverage_rating: 5, kitchen_mastery_rating: 4, power_game_rating: 4, touch_and_feel_rating: 5, athleticism_rating: 6, creativity_rating: 9, court_iq_rating: 4, consistency_rating: 3 },
    brand_detection: {
      brands: [],
      total_brands_detected: 0,
      sponsorship_whitespace: ["paddle", "shoes", "apparel", "hat", "sunglasses", "bag", "wristband", "water/beverage", "net", "court surface"],
    },
    badge_intelligence: { predicted_badges: [{ badge_name: "Wild Card", badge_slug: "wild_card", confidence: "high" }, { badge_name: "Comedy Gold", badge_slug: "comedy_gold", confidence: "high" }], highlight_reel_worthy: true, top_10_play_candidate: false },
    storytelling: { story_arc: "error_highlight" },
    commentary: { broadcast_hook: "Did they just... switch hands MID-RALLY?!", espn: "I... I don't think we've ever seen that before. The paddle slips, and rather than concede the point, they switch to their off-hand and keep fighting.", hype: "ABSOLUTE CHAOS! THE PADDLE WENT FLYING AND THEY KEPT GOING! 🤣🎪", coach: "Points for effort. Zero points for paddle security. Let's talk about grip pressure." },
    daas_signals: { highlight_category: "Viral Moment", clip_summary_one_sentence: "Player drops their paddle mid-rally, switches hands, and somehow keeps the point going in a hilarious display of determination.", search_tags: ["paddle drop", "funny", "viral", "determination", "off-hand"], content_use_cases: ["viral social content", "comedy reel", "brand engagement content"], estimated_dupr_range: "3.5-4.0" },
  },
];

// Multi-angle merge result for group TQWIPyvoX3B3 (clips 1-5)
export const MULTI_ANGLE_DATA = {
  group_id: MULTI_ANGLE_GROUP,
  angles_analyzed: 5,
  clip_ids: ["clip-001", "clip-002", "clip-003", "clip-004", "clip-005"],
  fused_intelligence: {
    total_shots_across_angles: 81,
    single_angle_avg_shots: 16.2,
    shot_detection_improvement: "5x coverage vs single camera",
    brands_confirmed_multi_angle: [
      { brand: "JOOLA", angles_detected: 5, confidence: "very high" },
      { brand: "LIFE TIME", angles_detected: 4, confidence: "very high" },
      { brand: "CRBN", angles_detected: 2, confidence: "high" },
      { brand: "SKECHERS", angles_detected: 1, confidence: "medium" },
      { brand: "SELKIRK", angles_detected: 1, confidence: "medium" },
      { brand: "ADIDAS", angles_detected: 1, confidence: "medium" },
    ],
    badge_consensus: [
      { badge: "Kitchen Assassin", votes: 3, total_angles: 5 },
      { badge: "Power Player", votes: 2, total_angles: 5 },
      { badge: "Iron Wall", votes: 2, total_angles: 5 },
      { badge: "Erne Master", votes: 1, total_angles: 5 },
      { badge: "Dive Master", votes: 1, total_angles: 5 },
    ],
    story_arc_votes: {
      athletic_highlight: 2,
      grind_rally: 1,
      dominant: 1,
      teaching_moment: 1,
    },
    skill_radar_fused: {
      court_coverage: 7.4,
      kitchen_mastery: 6.8,
      power_game: 6.6,
      touch_and_feel: 7.0,
      athleticism: 8.4,
      creativity: 6.4,
      court_iq: 6.8,
      consistency: 6.2,
    },
  },
};

// Aggregated stats for Command Center
export function getAggregatedStats() {
  const totalClips = CLIPS_DATA.length;
  const totalShots = CLIPS_DATA.reduce((sum, c) => sum + c.shot_analysis.total_shots_estimated, 0);
  const avgQuality = CLIPS_DATA.reduce((sum, c) => sum + c.clip_meta.clip_quality_score, 0) / totalClips;

  const brandMap = new Map<string, number>();
  CLIPS_DATA.forEach(c => {
    c.brand_detection.brands.forEach(b => {
      brandMap.set(b.brand_name, (brandMap.get(b.brand_name) || 0) + 1);
    });
  });

  return {
    totalClips,
    uniqueBrands: brandMap.size,
    totalShots,
    avgQuality: Math.round(avgQuality * 10) / 10,
    brandFrequency: Array.from(brandMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
  };
}

// Aggregated skill radar
export function getAvgSkillRadar() {
  const clips = CLIPS_DATA.filter(c => c.skill_indicators.court_coverage_rating > 0);
  const n = clips.length;
  if (n === 0) return [];

  const keys: (keyof ClipAnalysis["skill_indicators"])[] = [
    "court_coverage_rating", "kitchen_mastery_rating", "power_game_rating",
    "touch_and_feel_rating", "athleticism_rating", "creativity_rating",
    "court_iq_rating", "consistency_rating",
  ];

  return keys.map(k => ({
    skill: k.replace(/_rating$/, "").replace(/_/g, " "),
    value: Math.round((clips.reduce((s, c) => s + c.skill_indicators[k], 0) / n) * 10) / 10,
    fullMark: 10,
  }));
}

// All brand data with visibility
export function getBrandIntelligence() {
  const brandMap = new Map<string, {
    name: string;
    appearances: number;
    clips: string[];
    categories: Set<string>;
    totalVisibilitySeconds: number;
    confidences: { high: number; medium: number; low: number };
  }>();

  CLIPS_DATA.forEach(clip => {
    clip.brand_detection.brands.forEach(b => {
      const existing = brandMap.get(b.brand_name) || {
        name: b.brand_name,
        appearances: 0,
        clips: [],
        categories: new Set<string>(),
        totalVisibilitySeconds: 0,
        confidences: { high: 0, medium: 0, low: 0 },
      };
      existing.appearances++;
      if (!existing.clips.includes(clip._highlight_meta?.id || "")) {
        existing.clips.push(clip._highlight_meta?.id || "");
      }
      existing.categories.add(b.category);
      existing.totalVisibilitySeconds += b.estimated_visible_seconds;
      existing.confidences[b.confidence]++;
      brandMap.set(b.brand_name, existing);
    });
  });

  return Array.from(brandMap.values())
    .map(b => ({ ...b, categories: Array.from(b.categories) }))
    .sort((a, b) => b.appearances - a.appearances);
}

// Sponsorship whitespace aggregation
export function getSponsorshipWhitespace() {
  const categories = [
    "paddle", "shoes", "apparel", "hat", "sunglasses", "bag",
    "wristband", "water/beverage", "recovery drink", "ice/cooling",
    "towel", "net", "court surface",
  ];

  const filled = new Set<string>();
  CLIPS_DATA.forEach(clip => {
    clip.brand_detection.brands.forEach(b => filled.add(b.category));
  });

  return categories.map(cat => ({
    category: cat,
    filled: filled.has(cat),
    brand: filled.has(cat)
      ? CLIPS_DATA.flatMap(c => c.brand_detection.brands).find(b => b.category === cat)?.brand_name || "Unknown"
      : null,
  }));
}
