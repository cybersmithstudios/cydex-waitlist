# Cydex Waitlist - Excel Integration Setup Guide

## Overview
This guide will help you connect your Cydex waitlist forms to Excel using Zapier webhooks. You'll have two separate forms feeding into the same or different Excel sheets.

## Prerequisites
- Zapier account (free tier works)
- Microsoft Excel Online or Google Sheets
- The Cydex waitlist website deployed

## Step 1: Create Zapier Webhooks

### For Student Waitlist
1. Log into your Zapier account
2. Click "Create Zap"
3. Choose "Webhooks by Zapier" as the trigger
4. Select "Catch Hook" as the trigger event
5. Copy the webhook URL provided (you'll need this later)
6. Test the webhook by clicking "Test trigger"

### For Vendor Waitlist
1. Create a second Zap following the same steps above
2. This will give you a second webhook URL for vendor applications

## Step 2: Set Up Excel/Google Sheets Integration

### For Student Data:
1. In your student Zap, add an action step
2. Choose "Microsoft Excel" or "Google Sheets"
3. Select "Create Spreadsheet Row" as the action
4. Connect your Microsoft/Google account
5. Choose your spreadsheet and worksheet
6. Map the fields:
   - First Name → `firstName`
   - Last Name → `lastName`
   - Email → `email`
   - Hall → `hall`
   - Type → `type` (will always be "student")
   - Timestamp → `timestamp`

### For Vendor Data:
1. In your vendor Zap, add an action step
2. Choose "Microsoft Excel" or "Google Sheets"
3. Select "Create Spreadsheet Row" as the action
4. Map the fields:
   - Business Name → `businessName`
   - Owner Name → `ownerName`
   - Email → `email`
   - Phone → `phone`
   - Business Type → `businessType`
   - Description → `description`
   - Type → `type` (will always be "vendor")
   - Timestamp → `timestamp`

## Step 3: Update Your Website Code

### Student Form Webhook URL
In `src/components/WaitlistForm.tsx`, replace:
```javascript
const response = await fetch('YOUR_ZAPIER_WEBHOOK_URL_HERE', {
```

With your actual student webhook URL:
```javascript
const response = await fetch('https://hooks.zapier.com/hooks/catch/YOUR_STUDENT_HOOK_ID/', {
```

### Vendor Form Webhook URL
In `src/components/VendorWaitlistForm.tsx`, replace:
```javascript
const response = await fetch('YOUR_VENDOR_ZAPIER_WEBHOOK_URL_HERE', {
```

With your actual vendor webhook URL:
```javascript
const response = await fetch('https://hooks.zapier.com/hooks/catch/YOUR_VENDOR_HOOK_ID/', {
```

## Step 4: Test Your Integration

### Test Student Form:
1. Fill out the student waitlist form on your website
2. Check your Zapier dashboard to see if the webhook was triggered
3. Verify the data appears in your Excel/Google Sheets

### Test Vendor Form:
1. Fill out the vendor application form
2. Check your Zapier dashboard for the vendor webhook
3. Verify the data appears in your spreadsheet

## Step 5: Excel Sheet Structure

### Recommended Student Sheet Columns:
| First Name | Last Name | Email | Hall | Type | Timestamp |
|------------|-----------|-------|------|------|-----------|
| John | Doe | john@email.com | Kuti Hall | student | 2024-01-15T10:30:00Z |

### Recommended Vendor Sheet Columns:
| Business Name | Owner Name | Email | Phone | Business Type | Description | Type | Timestamp |
|---------------|------------|-------|-------|---------------|-------------|------|-----------|
| Campus Eats | Jane Smith | jane@campuseats.com | +234... | Restaurant | Fast food delivery... | vendor | 2024-01-15T11:00:00Z |

## Additional Features You Can Add

### Email Notifications
Add a second action in each Zap to send email notifications:
1. Add "Email by Zapier" action
2. Set up welcome emails for students
3. Set up confirmation emails for vendors

### Slack Notifications
Get notified in Slack when new signups occur:
1. Add "Slack" action to your Zaps
2. Send messages to a dedicated channel
3. Include key details like name, email, and type

### Data Validation
Add filters in Zapier to:
- Check for duplicate emails
- Validate phone number formats
- Filter by specific halls or business types

## Troubleshooting

### Common Issues:
1. **Webhook not triggering**: Check that the URL is correct and the form is submitting
2. **Data not appearing in Excel**: Verify field mappings in Zapier
3. **CORS errors**: Make sure your website domain is allowed (usually not an issue with Zapier)

### Testing Tips:
- Use Zapier's "Test" feature to send sample data
- Check the "Task History" in Zapier for error details
- Verify your Excel/Google Sheets permissions

## Security Considerations
- Keep your webhook URLs private
- Consider adding basic validation in your forms
- Monitor for spam submissions
- Set up rate limiting if needed

## Next Steps
Once your integration is working:
1. Monitor signup rates and trends
2. Set up automated follow-up sequences
3. Create dashboards for tracking metrics
4. Consider upgrading Zapier plan for more features

Your Cydex waitlist is now connected to Excel and ready to capture both student and vendor signups!