Peerly — MVP Product Specification

1. Product Goals
- Connect learners and teachers (or both) within UK cities.
- Simple, fast onboarding (<2 minutes).
- Deliver relevant, high-quality matches.
- Provide safe communication through DMs with report/block.
- Measure success with activation and engagement metrics.

Primary KPI
- % of new users who send/receive at least 1 Save/DM/Request in their first day.

Secondary KPIs
- Profile completion rate
- Response rate to DMs
- Report/block usage

2. User Roles
- Learner: wants to learn skills
- Teacher: offers skills
- Both: can do both

3. Onboarding Flow
- Select role: Learner / Teacher / Both
- Add profile basics: display name, avatar, city (dropdown)
- Choose skills:
    Learner → up to 3 tags to learn
    Teacher → up to 3 tags to teach
    Tag picker with recommendations + search
- Select preferred languages
- Pick availability: weeknights, weekends, mornings, evenings
- Add optional bio (120 chars)
- Accept safety agreement (checkbox)
- Create account: email, username, password (or Apple login)
- Enable push notifications
- Land on Discover feed

4. Navigation (tabs at the bottom of the screen)
- Discover → ranked feed of user cards (vertical scroll like instagram posts)
- Search → filter by tags, role, city, language, availability
- Messages → chats (only after accepted friend requests) and pending requests
- Profile → edit profile, view saves, manage preferences

5. Core Features
- Discover
    Vertical feed of cards (same city only)
    Card content: avatar, name, role badge, city, number of friends, tags, languages, availability, bio
    Actions: Save, Send Friend Request
- Search
    Search by name or tag
    Filters: role, city, language, availability
    Results use same card design as Discover
- Friend Requests
    Users can send friend requests to each other
    Recipient can Accept or Decline
    Once accepted, both users appear as friends and can message each other
    Pending requests show in Messages tab under “Requests”
- Messages
    1:1 direct messaging
    Report/block in chat header
- Profile
    Edit personal info, tags, languages, availability
    Manage saved profiles and friends
    Access community guidelines
    Delete account

6. Matching & Ranking
- Users matched by city only
- Ranking score:
    Teach <-> Learn tag overlap
    Language overlap
    Availability overlap
    Recent activity
    Profile completeness
    Diversity: avoid repeating same user or tag cluster

7. Safety
- Report profiles and messages
- Block to hide users completely
- Minimum age: 16+
- GDPR Law: export and delete data (including S3) on request

8. Anti-Spam
- Max 10 friend requests/day
- Unlimited accepts/declines/replies
- Downrank users with high report ratios

9. Analytics
- Track onboarding completion
- Track discover views and card actions
- Track friend requests (sent, accepted, declined)
- Track DMs (messages sent)
- Track reports and blocks

10. Roadmap
- MVP (Now)
    Onboarding
    City-based discover
    Search
    Friend requests and messaging
    Safety features 
    Push notifications
    Analytics
- Post MVP
    Group chats
    Pinecone embedding based recommendation searching with cosine similarity?

    Premium Features (Everyone can use the app free. Premium gives daily users useful extras:)
        Restrict incoming friend requests by gender
        Restrict incoming requests by age range 
        Extended daily friend requests from 10 to 100?
        See who saved you feature 
        Boost profile: appear higher in Discover feed and searches