# 🚀 WhatsAgent A/B Test - Quick Reference Card

## 🔗 Test URLs At A Glance

### Page Versions
| Version | URL | Components | Strategy |
|---------|-----|:----------:|----------|
| **Original** | `/` | 18 | Everything |
| **Version A** | `/a` | 10 | Problem → Solution |
| **Version B** | `/b` | 8 | Value → Proof |

### Copy Variations (works on any page)
| Test | Add to URL | Focus |
|------|------------|-------|
| **$5M Story** | `?v=control` | Success story |
| **Stop Losing** | `?v=problem` | Pain points |
| **Save Money** | `?v=savings` | Cost savings |
| **Fast Setup** | `?v=speed` | Quick results |
| **Proven** | `?v=proof` | Credibility |

### 🎯 Quick Test Examples
```
localhost:5173/a?v=problem   → Version A + Problem copy
localhost:5173/b?v=savings   → Version B + Savings copy
localhost:5173/?debug=true   → See debug dashboard
```

---

## 📊 What's Different in Each Version?

### Version A (/a) - "Problem-Focused"
```
Hero → PROBLEM → PROBLEM → Proof → Value → Compare → Trust → CTA
```
**Best for:** Cold traffic that doesn't know they need this yet

### Version B (/b) - "Value-Focused"
```
Hero → VALUE → SAVINGS → Proof → Trust → Bonuses → Urgency → CTA
```
**Best for:** Warm traffic that knows the problem, wants solution

---

## 🎨 Headlines Being Tested

| Variation | Main Message |
|-----------|--------------|
| **control** | "Generated $5M in 12 Months" |
| **problem** | "Stop Losing 73% of WhatsApp Leads" |
| **savings** | "Replace $48k Sales Team with $497" |
| **speed** | "Start Closing in 5 Minutes" |
| **proof** | "AI That Actually Closes Deals" |

---

## 📈 Track Performance

### Check These Daily
- **Conversion Rate** - Which version converts best?
- **Bounce Rate** - Which keeps people engaged?
- **CTA Clicks** - Which headlines drive action?

### Tools
- **Clarity**: `ta73lpsqxt` (already setup)
- **Debug**: Add `?debug=true` to any URL

---

## ⚡ Common Tasks

### Switch headline for testing
```javascript
// Visit any URL with ?v= parameter
yoursite.com/?v=problem
yoursite.com/a?v=savings
yoursite.com/b?v=speed
```

### View all versions quickly
```javascript
// Open in 3 tabs
yoursite.com/       // Original
yoursite.com/a      // Problem-focused
yoursite.com/b      // Value-focused
```

### Share specific test with team
```javascript
// Copy these exact URLs
yoursite.com/a?v=problem    // "Test the problem angle"
yoursite.com/b?v=savings    // "Test the savings angle"
```

---

## 🏆 Current Results (Update Weekly)

| Metric | Original | Version A | Version B | Winner |
|--------|----------|-----------|-----------|---------|
| Conversion | - | - | - | TBD |
| Avg Time | - | - | - | TBD |
| Bounce | - | - | - | TBD |
| CTA Click | - | - | - | TBD |

*Last Updated: Sept 14, 2024*

---

## 🔥 Quick Wins Checklist

- [ ] Test problem copy on Version A first (usually wins)
- [ ] Test savings copy on Version B (for price-sensitive)
- [ ] Run each test for minimum 1 week
- [ ] Don't change mid-test
- [ ] Document everything

---

**Remember:** Let tests run for 14 days minimum before making decisions!