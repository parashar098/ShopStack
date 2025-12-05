#!/bin/bash
# ShopStack Deployment Debug Script
# Run this to check if the backend API is properly connected

API_URL="${NEXT_PUBLIC_API_URL:-http://localhost:5000}"

echo "🔍 ShopStack Deployment Diagnostics"
echo "=================================="
echo ""
echo "📌 Environment Variables:"
echo "   NEXT_PUBLIC_API_URL: $API_URL"
echo ""

echo "🌐 Testing Backend API Connection..."
echo ""

# Test Products Endpoint
echo "1️⃣  Testing /api/products endpoint..."
PRODUCTS_RESPONSE=$(curl -s -w "\n%{http_code}" "$API_URL/api/products")
HTTP_CODE=$(echo "$PRODUCTS_RESPONSE" | tail -n1)
BODY=$(echo "$PRODUCTS_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Products endpoint is working!"
    PRODUCT_COUNT=$(echo "$BODY" | grep -o '"_id"' | wc -l)
    echo "   📦 Found $PRODUCT_COUNT products in database"
else
    echo "   ❌ Products endpoint returned HTTP $HTTP_CODE"
    echo "   Response: $BODY"
fi

echo ""

# Test Orders Endpoint
echo "2️⃣  Testing /api/orders endpoint..."
ORDERS_RESPONSE=$(curl -s -w "\n%{http_code}" "$API_URL/api/orders")
HTTP_CODE=$(echo "$ORDERS_RESPONSE" | tail -n1)

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "401" ]; then
    echo "   ✅ Orders endpoint is accessible (HTTP $HTTP_CODE)"
else
    echo "   ❌ Orders endpoint returned HTTP $HTTP_CODE"
fi

echo ""
echo "✨ Diagnostics Complete!"
echo ""
echo "📝 Next Steps:"
echo "   - If both endpoints return ✅, your backend is properly configured"
echo "   - If endpoints return ❌, check your NEXT_PUBLIC_API_URL environment variable"
echo "   - Ensure backend is running and publicly accessible"
echo ""
