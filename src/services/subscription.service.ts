import { db } from '../database/knex';

export interface CreateSubscriptionDTO {
  user_id: string;
  plan_id: string;
  paid_value?: number;
}

export const subscriptionService = {
  async findActiveByUser(userId: string) {
    return db('subscriptions as s')
      .leftJoin('plans as p', 's.plan_id', 'p.id')
      .where('s.user_id', userId)
      .andWhere('s.status', 'active')
      .select(
        's.id',
        's.user_id',
        's.plan_id',
        's.paid_value',
        's.status',
        's.started_at',
        'p.title as plan_title',
        'p.price as plan_price',
        'p.color as plan_color'
      )
      .first();
  },

  async findByUser(userId: string) {
    return db('subscriptions as s')
      .leftJoin('plans as p', 's.plan_id', 'p.id')
      .where('s.user_id', userId)
      .select('s.*', 'p.title as plan_title', 'p.price as plan_price')
      .orderBy('s.created_at', 'desc');
  },

  async findAll() {
    return db('subscriptions as s')
      .leftJoin('plans as p', 's.plan_id', 'p.id')
      .leftJoin('users as u', 's.user_id', 'u.id')
      .select(
        's.*',
        'p.title as plan_title',
        'u.name as user_name',
        'u.email as user_email'
      )
      .orderBy('s.created_at', 'desc');
  },

  async assign(data: CreateSubscriptionDTO) {
    const user = await db('users').where({ id: data.user_id }).first();
    if (!user) throw new Error('Usuário não encontrado.');

    const plan = await db('plans').where({ id: data.plan_id }).first();
    if (!plan) throw new Error('Plano não encontrado.');

    return db.transaction(async (trx) => {
      await trx('subscriptions')
        .where({ user_id: data.user_id, status: 'active' })
        .update({
          status: 'canceled',
          canceled_at: trx.fn.now(),
          updated_at: trx.fn.now(),
        });

      const [created] = await trx('subscriptions')
        .insert({
          user_id: data.user_id,
          plan_id: data.plan_id,
          paid_value: data.paid_value ?? 0,
          status: 'active',
        })
        .returning('*');

      return created;
    });
  },

  async cancel(userId: string) {
    await db('subscriptions')
      .where({ user_id: userId, status: 'active' })
      .update({
        status: 'canceled',
        canceled_at: db.fn.now(),
        updated_at: db.fn.now(),
      });
  },
};
