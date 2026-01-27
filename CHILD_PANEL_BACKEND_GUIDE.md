# Child Panel System - Backend Implementation Guide

This guide provides backend implementation details for the Child Panel system.

## Database Schema

See `child_panel_system_migration.sql` for the complete SQL schema.

## API Endpoints Required

### 1. Get All Child Panels
```
GET /api/child-panels
Response: { data: [child_panels], message: "..." }
```

### 2. Get Single Child Panel
```
GET /api/child-panels/{id}
Response: { data: child_panel, stats: {...}, message: "..." }
```

### 3. Create Child Panel
```
POST /api/child-panels
Body: {
  domain: string,
  panel_name: string,
  admin_username: string,
  admin_email: string,
  admin_password: string,
  currency: string,
  price_per_month: decimal,
  markup_percentage: decimal (optional),
  nameservers: array (optional)
}
Response: { data: child_panel, message: "Child panel created successfully" }
```

### 4. Update Child Panel
```
PUT /api/child-panels/{id}
Body: { ...fields to update... }
Response: { data: child_panel, message: "..." }
```

### 5. Delete Child Panel
```
DELETE /api/child-panels/{id}
Response: { message: "Child panel deleted successfully" }
```

### 6. Get Child Panel Stats
```
GET /api/child-panels/{id}/stats
Response: {
  data: {
    total_users: int,
    total_orders: int,
    total_revenue: decimal,
    total_profit: decimal,
    balance: decimal
  }
}
```

### 7. Get Child Panel Users
```
GET /api/child-panels/{id}/users
Query: page, search, status
Response: { data: [users], meta: { pagination } }
```

### 8. Get Child Panel Orders
```
GET /api/child-panels/{id}/orders
Query: page, status, search
Response: { data: [orders], meta: { pagination } }
```

### 9. Get Child Panel Transactions
```
GET /api/child-panels/{id}/transactions
Query: page, type
Response: { data: [transactions], meta: { pagination } }
```

### 10. Add Balance to Child Panel
```
POST /api/child-panels/{id}/add-balance
Body: { amount: decimal }
Response: { data: transaction, message: "Balance added successfully" }
```

### 11. Pay Subscription
```
POST /api/child-panels/{id}/pay-subscription
Body: { payment_method: string, transaction_id: string (optional) }
Response: { data: subscription, message: "Subscription paid successfully" }
```

### 12. Generate API Key
```
POST /api/child-panels/{id}/generate-api-key
Response: { data: { api_key: string }, message: "API key generated" }
```

### 13. Toggle Status
```
POST /api/child-panels/{id}/toggle-status
Body: { status: 'active' | 'suspended' }
Response: { data: child_panel, message: "Status updated" }
```

## Email Notifications

When a child panel is created, send email to:
- Parent user (confirmation)
- Child panel admin (credentials)

When subscription payment is made, send email to:
- Parent user (receipt)
- Child panel admin (confirmation)

When subscription expires, send email to:
- Parent user (renewal reminder)
- Child panel admin (expiry notice)

## Laravel Implementation Notes

1. Create `ChildPanel` model
2. Create `ChildPanelController` with all endpoints
3. Create `ChildPanelService` for business logic
4. Create email notifications using Laravel Mail
5. Implement authorization (users can only access their own child panels)
6. Use Laravel queues for email sending if possible
7. Implement payment processing integration
8. Add validation rules for all inputs
9. Implement API key generation (similar to user API keys)

## Security Considerations

- Hash child panel admin passwords
- Validate domain ownership
- Rate limit API endpoints
- Check parent user balance before creating child panel
- Validate subscription payments
- Secure API key storage

