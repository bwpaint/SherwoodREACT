import type { Access } from 'payload'

/** Anyone (including unauthenticated) can read. */
export const anyone: Access = () => true

/** Only signed-in admins can perform the action. */
export const adminsOnly: Access = ({ req: { user } }) => !!user
