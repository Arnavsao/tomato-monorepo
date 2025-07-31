# Environment Configuration

This directory contains configuration files for managing different environments (development, production, etc.).

## Files

- `environment.js` - Environment-specific configuration
- `api.js` - API utilities using environment config
- `README.md` - This documentation

## How it works

The application automatically detects the environment:
- **Development**: When running with `npm run dev` or `yarn dev`
- **Production**: When running with `npm run build` or deployed

## Configuration

### Development
- Backend URL: `http://localhost:4000`
- Used when running locally

### Production  
- Backend URL: `https://tomato-backend-weqp.onrender.com`
- Used when deployed to production

## Adding New Environments

To add a new environment (e.g., staging):

1. Edit `environment.js`:
```javascript
export const ENVIRONMENTS = {
  development: { /* ... */ },
  staging: {
    name: 'Staging',
    backendUrl: 'https://your-staging-backend.com',
    description: 'Staging environment'
  },
  production: { /* ... */ }
};
```

2. Set environment variable to override auto-detection:
```bash
VITE_ENV=staging npm run dev
```

## Usage in Components

```javascript
import { buildApiUrl } from '../config/api.js';

// This will automatically use the correct URL
const response = await fetch(buildApiUrl('/api/contact'), {
  method: 'POST',
  // ...
});
```

## Console Output

The application logs which environment it's running in:
```
🚀 Running in Development mode
📡 Backend URL: http://localhost:4000
```

or

```
🚀 Running in Production mode  
📡 Backend URL: https://tomato-backend-weqp.onrender.com
``` 