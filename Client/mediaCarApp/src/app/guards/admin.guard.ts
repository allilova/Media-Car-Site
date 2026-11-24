import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

/** Пуска само влезли админи. Истинската защита е на сървъра – това само пази UI-а. */
export const adminGuard: CanActivateFn = () => {
  const admin = inject(AdminService);
  return admin.isLoggedInAsAdmin() ? true : inject(Router).createUrlTree(['/admin']);
};
