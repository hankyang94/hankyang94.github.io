---
layout: page
permalink: /talks/
title: Talks
description: Selected talks and seminar presentations.
nav: true
# Add talks manually here. Use date for month/year, for example "Jun 2026".
# The date, venue, slides, and recording fields are optional.
talk_groups:
  - name: "Mathematical Optimization"
    talks:
      - title: "Alternating Direction Method of Multipliers for Semidefinite Programming: Theory and Practice"
        date: "Jun 2026"
        venue: "Department of Applied Mathematics, Hong Kong Polytechnic University"
        slides: "https://drive.google.com/file/d/1l7Vul1AuzxFzBKJvin2lYVpHTRDRl8ct/view?usp=sharing"
        recording:

      - title: "Bifurcation of ADMM Dynamics for Semidefinite Programming and Simplicial Regularizability of the Pseudo-Moment Cone"
        date: "Jun 2026"
        venue: "SIAM Conference on Optimization"
        slides: "https://drive.google.com/file/d/1Ko7uMH713tUejU3vlVXqyjc9FYsNJVeJ/view?usp=sharing"
      
      - title: "Local Linear Convergence of the Alternating Direction Method of Multipliers for Semidefinite Programming under Strict Complementarity"
        date: "Apr 2025"
        venue: "Department of Mathematics, University of Maryland"
        slides: "https://drive.google.com/file/d/1YlzfAqAtuc38qTdCKpIy_rDiUn0LEiaP/view?usp=sharing"
  
  - name: "Robotics"
    talks:
      - title: "Scaling Semidefinite Relaxations for Robot Perception and Planning"
        date: "Jun 2026"
        venue: "Workshop on the Frontiers of Optimization for Robotics, International Conference on Robotics and Automation"
        slides: "https://drive.google.com/file/d/1g-Fut4nwk_EryIfQn8GTozwJAmRyIDhX/view?usp=sharing"
        recording:

      - title: "Semidefinite Relaxations for Robot Perception and Control: From Theory to Practice and Back"
        date: "Dec 2025"
        venue: "IEEE RAS TC on Model-based Optimization for Robotics"
        slides: "https://drive.google.com/file/d/1IFd4ZrUix9IczKOC58FPzhEifKt5Sdmy/view?usp=sharing"
        recording: "https://youtu.be/nXthoML7ERc?si=ulZqsHUuhMUeksoD"

      - title: "Optimization-Driven Discovery of Contact-Rich Behaviors"
        date: "Jun 2025"
        venue: "LAAS-CNRS, Toulouse, France"
        slides: "https://drive.google.com/file/d/1wNl8HjoA7JPzQE0JKtkTiNpLyVZ6d244/view?usp=sharing"

      - title: "The Power of Modern Convex Optimization in Nonconvex Perception, Control, and Learning"
        date: "Oct 2024"
        venue: "LAAS-CNRS, Toulouse, France"
        slides: "https://drive.google.com/file/d/1-WA-USrkAtPGKTEUWypT2iImp_826r9t/view?usp=sharing"

      - title: "Certifiable Outlier-Robust Geometric Perception"
        date: "Jun 2022"
        venue: "Toronto AI and Robotics Seminar"
        recording: "https://youtu.be/hpqnBPL9lH4?si=f_QKlRC9Og2DOCJO"
  
  - name: "Machine Learning"
    talks:
      - title: "Control-oriented Clustering of Visual Latent Representation"
        date: "Oct 2024"
        venue: "Machine Learning Seminar, University of Minnesota"
        slides: "https://drive.google.com/file/d/1KEdK59HnY2QxZVTySRvoSu4KJqOeFKia/view?usp=sharing"
        recording: "https://youtu.be/Pl_SJx6IhqM?si=nQPts_xibXIDHkee"

  - name: "Control"
    talks:
      - title: "Online Uncertainty Set Prediction and Set-Membership Estimation"
        date: "Jul 2025"
        venue: "Interplay Between Machine Learning and Set-Based Identification & Control, American Control Conference"
        slides: "https://drive.google.com/file/d/1uG9IRPO09CPpesyBKnZ0l08km9K8wPVB/view?usp=sharing"

      - title: "Revisiting the Minimum Enclosing Ellipsoid of Set-Membership Estimation in Control and Perception"
        date: "Nov 2023"
        venue: "Autonomy Talks"
        slides: "https://drive.google.com/file/d/1cA3xxGPWXd3AHdn5ecSHhJC8XQiJJtGV/view?usp=sharing"
        recording: "https://youtu.be/eBtlKthnvm8?si=SRn0XhDYLwqyDYGg"
---

---

<div class="talks">
  {%- for group in page.talk_groups -%}
  {%- unless forloop.first -%}
  <hr class="talk-group-divider">
  {%- endunless -%}
  <section class="talk-group">
    <h2 class="talk-group-title">{{ group.name }}</h2>
    {%- for talk in group.talks -%}
    <article class="talk-entry">
      <h3 class="talk-title">{{ talk.title }}</h3>
      {%- if talk.date or talk.venue %}
      <div class="talk-meta">
        {%- if talk.date %}<span>{{ talk.date }}</span>{%- endif -%}
        {%- if talk.venue %}<span>{{ talk.venue }}</span>{%- endif -%}
      </div>
      {%- endif %}
      {%- if talk.slides or talk.recording %}
      <div class="talk-links">
        {%- if talk.slides %}
        <a href="{{ talk.slides }}" target="_blank" rel="noopener noreferrer">slides</a>
        {%- endif %}
        {%- if talk.recording %}
        <a href="{{ talk.recording }}" target="_blank" rel="noopener noreferrer">recording</a>
        {%- endif %}
      </div>
      {%- endif %}
    </article>
    {%- endfor -%}
  </section>
  {%- endfor -%}
</div>
