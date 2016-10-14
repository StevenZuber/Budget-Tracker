package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.ExpenseDao;
import entities.Expense;

@RestController
public class ExpenseController {

	@Autowired
	private ExpenseDao expenseDao;
	
	@RequestMapping(path="/ping", method = RequestMethod.GET)
	public String ping() {
		String pong = "pong";
		return pong;
	}
	
	@RequestMapping(path = "/expenses", method = RequestMethod.GET)
	public List<Expense> index() {
		return expenseDao.index();
	}

	@RequestMapping(path = "/expenses/{id}", method = RequestMethod.GET)
	public Expense show(@PathVariable int id) {
		return expenseDao.show(id);
	}
	
	@RequestMapping(path = "/expenses", method = RequestMethod.POST)
	public void create(@RequestBody String ExpenseJSON) {
		ObjectMapper mapper = new ObjectMapper();
		Expense newExpense = null;
		try {
			newExpense = mapper.readValue(ExpenseJSON, Expense.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		expenseDao.create(newExpense);
	}
	
	@RequestMapping(path = "/expenses/{id}", method = RequestMethod.DELETE)
	public void destroy(@PathVariable int id) {
		try {
			expenseDao.destroy(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(path = "/expenses/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable int id, @RequestBody String ExpenseJSON){
		ObjectMapper mapper = new ObjectMapper();
		Expense editExpense = null;
		try {
			editExpense = mapper.readValue(ExpenseJSON, Expense.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		expenseDao.update(id, editExpense);
	}
}
