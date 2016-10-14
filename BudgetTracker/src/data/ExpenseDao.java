package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.Expense;

@Transactional
public class ExpenseDao {
	@PersistenceContext
	private EntityManager em;
	
	public List<Expense> index(){
		String query = "Select e from Expense e";
		return em.createQuery(query, Expense.class).getResultList();
	}
	
	public Expense show(int id){
		return em.find(Expense.class, id);
	}
	
	public void create(Expense expense){
		expense.setName(expense.getName());
		expense.setCost(expense.getCost());
		expense.setDescription(expense.getDescription());
		
		em.persist(expense);
		em.flush();
	}
	
	public void update(int id, Expense expense){
		Expense editExpense = em.find(Expense.class, id);
		
		editExpense.setCost(expense.getCost());
		editExpense.setName(expense.getName());
		editExpense.setDescription(expense.getDescription());
	
		em.merge(editExpense);
	}
	
	public void destroy(int id){
		Expense expense = em.find(Expense.class, id);
		
		em.remove(expense);
	}
	
}
